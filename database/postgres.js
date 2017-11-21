require('dotenv').config();
const Sequelize = require('sequelize');

let params = {};
if (!process.env.LOCAL) { params = { dialect: 'postgres', protocol: 'postgres', dialectOptions: { ssl: true } }; }
const sequelize = new Sequelize(process.env.DATABASE_URL, params);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(err => console.error('Unable to connect to database:', err));

const Video = sequelize.define('video', {
  videoName: Sequelize.STRING,
  creator: Sequelize.STRING,
  url: Sequelize.STRING,
  description: Sequelize.STRING,
});

const Playlist = sequelize.define('playlist', {
  playlistName: Sequelize.STRING,
});

const Room = sequelize.define('room', {
  indexKey: Sequelize.INTEGER,
  startTime: Sequelize.DATE,
});

Video.sync({ force: true }).then(() => {
  return Video.create({
    videoName: 'sample video name',
    creator: 'sample video creator',
    url: 'sample url',
    description: 'description',
  });
});

const incrementIndex = () => {
  Room.increment('indexKey');
};

const setStartTime = () => {
  Room.update({ startTime: Date.now() });
};

const storeVideoInDatabase = (videoData) => {
  const videoEntry = {
    videoName: videoData.title,
    creator: videoData.creator,
    url: videoData.url,
    description: videoData.description,
  };
  return Video.create(videoEntry); // returns a promise when called
};

const findVideos = () => Video.findAll();

exports.Video = Video;
exports.Playlist = Playlist;
exports.storeVideoInDatabase = storeVideoInDatabase;
exports.findVideos = findVideos;
