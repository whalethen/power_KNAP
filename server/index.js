const http = require('http');
const express = require('express');
const youtubeApi = require('./youtubeService');
const db = require('../database/postgres');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(`${__dirname}./../client`));
const lobbySpace = io.of('/lobby');
const roomSpace = io.of('/room');

// Room HTTP requests
app.get('/room', (req, res) => {
  const roomProperties = {};
  db.findVideos()
    .then((videos) => { roomProperties.videos = videos; })
    .then(() => db.getRoomProperties())
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

// Room socket events
// let roomHost;
// const giveHostStatus = host => roomSpace.to(host).emit('host');

roomSpace.on('connection', (socket) => {
  console.log(`connected to ${Object.keys(socket.nsp.sockets).length} socket(s)`);

  // if (Object.keys(socket.nsp.sockets).length === 1) {
  //   roomHost = socket.id;
  //   giveHostStatus(roomHost);
  // }

  const sendPlaylist = () => {
    db.findVideos()
      .then((videos) => {
        roomSpace.emit('retrievePlaylist', videos);
        if (videos.length === 0) throw videos;
        if (videos.length === 1) db.setStartTime();
      })
      .catch((emptyPlaylist) => {
        if (Array.isArray(emptyPlaylist)) {
          roomSpace.emit('default');
        } else {
          throw emptyPlaylist;
        }
      })
      .catch(err => roomSpace.emit('error', err));
  };

  socket.on('saveToPlaylist', (video) => {
    const videoData = {
      title: video.snippet.title,
      creator: video.snippet.channelTitle,
      url: video.id.videoId,
      description: video.snippet.description,
    };
    return db.createVideoEntry(videoData)
      .then(() => sendPlaylist());
  });

  // socket.on('removeFromPlaylist', (videoName) => {
  //   db.removeFromPlaylist(videoName)
  //     .then(() => sendPlaylist())
  //     .catch(err => roomSpace.emit('error', err));
  // });

  socket.on('disconnect', () => {
    if (Object.keys(socket.nsp.sockets).length > 0) {
      // const newHost = Object.keys(socket.nsp.sockets)[0];
      console.log(`A user has disconnected from ${roomSpace.name}`);
      // return (newHost === roomHost) ? null : giveHostStatus(newHost);
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
  console.log('connected to lobby');

  socket.on('createRoom', (roomName) => {
    db.createRoomEntry(roomName)
      .then(() => db.findRooms())
      .then(rooms => lobbySpace.emit('retrieveRooms', rooms));
  });
});
