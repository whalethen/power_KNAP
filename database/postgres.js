require('dotenv').config();
const Sequelize = require('sequelize');
var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)


// let params = {};
// if (!process.env.LOCAL) { params = { dialect: 'postgres', protocol: 'postgres', logging: false, dialectOptions: { ssl: true } }; }
const sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: false,
    dialectOptions: {
        ssl: true
    }
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(err => console.error('Unable to connect to database:', err));

const Video = sequelize.define('video', {
  videoName: Sequelize.STRING,
  creator: Sequelize.STRING,
  url: Sequelize.STRING,
  duration: Sequelize.STRING,
});

const Playlist = sequelize.define('playlist', {
  playlistName: Sequelize.STRING,
});

// Video.sync({ force: true }).then(() => {
//   return Video.create({
//     videoName: 'sample video name',
//     creator: 'sample video creator',
//     url: 'sample url',
//     duration: '1231',
//   });
// });

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
