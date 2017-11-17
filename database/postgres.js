const Sequelize = require('sequelize');
const sequelize = new Sequelize('famly', 'Phoebe', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully')
  })
  .catch((err) => {
    console.error('Unable to connect to database:', err);
  });

const Video = sequelize.define('video', {
  videoName: Sequelize.STRING,
  creator: Sequelize.STRING,
  url: Sequelize.STRING,
  duration: Sequelize.STRING,
});

const Playlist = sequelize.define('playlist', {
  playlistName: Sequelize.STRING,
});

exports.storeVideoInDatabase = (videoData) => {
  const videoEntry = {
    videoName: videoData.title,
    creator: videoData.creator,
    url: videoData.url,
    duration: videoData.duration,
  };
  return Video.create(videoEntry); // returns a promise when called
};

Video.findAll().then((videos) => {
  console.log(videos);
});

Playlist.findAll().then((playlists) => {
  console.log(playlists);
});
