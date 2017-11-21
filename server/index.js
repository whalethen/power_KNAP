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

app.get('/renderPlaylist', (req, res) => {
  return db.findVideos()
    .then(videos => res.json(videos));
});

io.on('connection', (socket) => {
  console.log('connected to client');

  const sendPlaylist = () => {
    return db.findVideos()
      .then(videos => io.emit('retrievePlaylist', videos))
      .catch(err => io.emit('Could not save YT data: ', err));
  };

  // listen for incoming youtube searches
  socket.on('youtubeSearch', (query) => {
    youtubeApi.grabVideos(query)
      .then(videos => io.emit('searchResults', videos))
      .catch(err => io.emit('error', err));
  });

  socket.on('saveToPlaylist', (video) => {
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
