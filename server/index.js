const http = require('http');
const express = require('express');
const youtubeApi = require('./youtubeService');
const db = require('../database/postgres');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const rooomSpace = io.of('/room');
const lobbySpace = io.of('/lobby');


server.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}./../client`));

app.get('/renderPlaylist', (req, res) => {
  db.findVideos()
    .then(videos => res.json(videos));
});

app.get('/search', (req, res) => {
  youtubeApi.grabVideos(req.query.query)
    .then(searchResults => res.json(searchResults))
    .catch(() => res.sendStatus(404));
});

const sendToRoom = ({ indexKey }) => {
  rooomSpace.emit('playNext', indexKey);
};

app.patch('/playNext/:length', (req, res) => {
  const roomPlaylistLength = Number(req.params.length);
  db.getIndex()
    .then((currentSongIndex) => {
      if (roomPlaylistLength === currentSongIndex) {
        db.resetRoomIndex()
          .then(room => sendToRoom(room.dataValues))
          .then(() => res.end())
          .catch(err => res.send(err));
      } else {
        db.incrementIndex()
          .then(room => sendToRoom(room.dataValues))
          .then(() => res.end())
          .catch(err => res.send(err));
      }
    });
});


rooomSpace.on('connection', (socket) => {
  console.log('connected to client');

  const sendPlaylist = () => {
    return db.findVideos()
      .then(videos => rooomSpace.emit('retrievePlaylist', videos))
      .catch(err => rooomSpace.emit('Could not save YT data: ', err));
  };

  rooomSpace.on('saveToPlaylist', (video) => {
    const videoData = {
      title: video.snippet.title,
      creator: video.snippet.channelTitle,
      url: video.id.videoId,
      description: video.snippet.description,
    };
    return db.storeVideoInDatabase(videoData)
      .then(() => sendPlaylist());
  });
});
