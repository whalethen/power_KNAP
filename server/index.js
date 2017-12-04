const http = require('http');
const express = require('express');
const youtubeApi = require('./youtubeService');
const db = require('../database/postgres');
const passport = require('passport');
const cookieSession = require('cookie-session');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const authRoutes = require('./auth-routes');
const passportSetup = require('../passport-setup');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, () => console.log(`listening on port ${port}`));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use(history());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}./../client`));
const roomSpace = io.of('/room');
const lobbySpace = io.of('/lobby');

app.use(cookieSession({
  keys: process.env.COOKIEKEY,
  maxAge: 24 * 60 * 60 * 1000, // one day
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Room HTTP Requests
app.get('/renderRoom/:roomId', (req, res) => {
  const { params } = req;
  const roomProperties = {};
  db.findVideos(params.roomId)
    .then((videos) => { roomProperties.videos = videos; })
    .then(() => db.getRoomProperties(Number(params.roomId)))
    .then(({ indexKey, startTime }) => {
      roomProperties.index = indexKey;
      roomProperties.start = startTime;
    })
    .then(() => res.json(roomProperties))
    .catch(() => res.sendStatus(404));
});

app.get('/playlist/:roomId', (req, res) => {
  const { params } = req;
  const roomProperties = {};
  db.findVideos(params.roomId)
    .then((videos) => { roomProperties.videos = videos; })
    .then(() => db.getRoomProperties(params.roomId))
    .then(({ indexKey, startTime }) => {
      roomProperties.index = indexKey;
      roomProperties.start = startTime;
    })
    .then(() => res.json(roomProperties))
    .catch(() => res.sendStatus(404));
});

app.get('/search', (req, res) => {
  youtubeApi.grabVideos(req.query.query)
    .then(searchResults => res.json(searchResults))
    .catch(() => res.sendStatus(404));
});

app.patch('/playNext/:length', (req, res) => {
  const roomPlaylistLength = Number(req.params.length);

  const sendIndex = ({ indexKey }) => {
    roomSpace.emit('playNext', indexKey);
  };

  const queueNextVideo = (playlistLength, currentIndex) => {
    if (playlistLength === currentIndex) return db.resetRoomIndex();
    return db.incrementIndex();
  };

  db.getIndex()
    .then(currentSongIndex => queueNextVideo(roomPlaylistLength, currentSongIndex))
    .then(room => sendIndex(room.dataValues))
    .then(() => db.setStartTime())
    .then(() => res.end())
    .catch(err => res.send(err));
});

app.patch('/vote', (req, res) => {
  db.changeVotes(req.body.video, req.body.action)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});

// Room Socket Events
let roomHost;
const giveHostStatus = host => roomSpace.to(host).emit('host');

roomSpace.on('connection', (socket) => {
  console.log(`connected to ${Object.keys(socket.nsp.sockets).length} socket(s)`);
  roomSpace.to(socket.id).emit('id', socket.id);
  if (Object.keys(socket.nsp.sockets).length === 1) {
    roomHost = socket.id;
    giveHostStatus(roomHost);
  }

  const sendPlaylist = (roomId) => {
    return db.findVideos(roomId)
      .then((videos) => {
        roomSpace.emit('retrievePlaylist', videos);
        if (videos.length === 0) throw videos;
        if (videos.length === 1) db.setStartTime();
      })
      .catch((emptyPlaylist) => {
        if (Array.isArray(emptyPlaylist)) { // Check if the thrown item is an array rather than an Error
          roomSpace.emit('default');
        } else {
          throw emptyPlaylist;
        }
      })
      .catch(err => roomSpace.emit('error', err));
  };

  socket.on('room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('saveToPlaylist', ({ video, roomId }) => {
    const videoData = {
      title: video.snippet.title,
      creator: video.snippet.channelTitle,
      url: video.id.videoId,
      description: video.snippet.description,
      videoId: video.videoId,
      roomId,
    };
    return db.createVideoEntry(videoData)
      .then(() => sendPlaylist())
      .catch(err => console.error(err));
  });

  socket.on('removeFromPlaylist', ({ videoName, roomId }) => {
    db.removeFromPlaylist(videoName, roomId)
      .then(() => sendPlaylist())
      .catch(err => roomSpace.emit('error', err));
  });

  socket.on('emitMessage', (message, roomId) => {
    if (message.userName.includes('#')) {
      message.userName = message.userName.split('#')[1].substring(0, 8); // Pluck Socket ID
    }
    let sum = 0;
    for (let i = 0; i < 3; i += 1) {
      sum += message.userName.charCodeAt(i);
    }
    const colors = ['#ffb3ba', '#ffd2b3', '#fff8b3', '#baffb3', '#bae1ff', '#e8baff'];
    const userColor = colors[(sum % colors.length)];
    message.userColor = userColor;

    roomSpace.to(roomId).emit('pushingMessage', message);
  });

  // socket.on('vote', update database)
  socket.on('typingMessage', (user, roomId) => {
    const userId = user.split('#')[1].substring(0, 8);
    socket.broadcast.to(roomId).emit('typingMessage', `${userId} is typing a message...`);
  });

  socket.on('disconnect', () => {
    if (Object.keys(socket.nsp.sockets).length > 0) {
      const newHost = Object.keys(socket.nsp.sockets)[0];
      console.log(`A user has disconnected from ${roomSpace.name}`);
      return (newHost === roomHost) ? null : giveHostStatus(newHost);
    }
    console.log(`${roomSpace.name} is now empty`);
  });
});

// Lobby HTTP Requests
app.get('/fetchRooms', (req, res) => {
  db.findRooms()
    .then(rooms => res.json(rooms))
    .catch(() => res.sendStatus(404));
});

// Lobby socket events
lobbySpace.on('connection', (socket) => {
  socket.on('createRoom', (roomName) => {
    db.createRoomEntry(roomName)
      .then(() => db.findRooms())
      .tap(rooms => console.log(rooms))
      .then(rooms => lobbySpace.emit('retrieveRooms', rooms));
  });
});
