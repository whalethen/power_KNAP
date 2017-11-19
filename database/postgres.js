const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://korykilpatrick:password@localhost:5432', { dialect: 'postgres', protocol: 'postgres', dialectOptions: { ssl: true } });

// const sequelize = new Sequelize('famly', 'Phoebe', 'password', {
//   host: 'postgres://onnalrnmsdaawl:d120ca2df7e240ca6ba016ea88eec78ce24d87f5348e5a5ed544f4fda86158cd@ec2-54-235-168-152.compute-1.amazonaws.com:5432/d500oa7t03a9qh',
//   dialect: 'postgres',
// });


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

const storeVideoInDatabase = (videoData) => {
  const videoEntry = {
    videoName: videoData.title,
    creator: videoData.creator,
    url: videoData.url,
    duration: videoData.duration,
  };
  return Video.create(videoEntry); // returns a promise when called
};

const findVideos = () => Video.findAll();

exports.Video = Video;
exports.Playlist = Playlist;
exports.storeVideoInDatabase = storeVideoInDatabase;
exports.findVideos = findVideos;
