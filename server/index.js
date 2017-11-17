const http = require('http');
const express = require('express');
const youtubeApi = require('./fetchYouTubeVideo');
const db = require('../database/postgres');

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}./../client`));

io.on('connection', (socket) => {
  console.log('connected to client');

  // listen for incoming youtube searches
  socket.on('youtubeSearch', (query) => {
    youtubeApi.fetchYoutubeVideos(query)
      .then(videos => io.emit('searchResults', videos))
      .catch(err => io.emit('error', err));
  });

  socket.on('saveVideoToPlaylist', (video) => {
    return youtubeApi.fetchVideoLength(video.id.videoId)
      .then((videoDuration) => {
        const videoData = {
          title: video.snippet.title,
          creator: video.snippet.channelTitle,
          url: `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`,
          duration: videoDuration,
        };
        return db.storeVideoInDatabase(videoData);
      })
      .then(result => console.log(result))
      .catch(err => console.error('Could not retrieve YT data: ', err));
  });
});
