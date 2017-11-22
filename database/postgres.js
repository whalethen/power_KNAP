require('dotenv').config();
const Sequelize = require('sequelize');

let params = {};
if (!process.env.LOCAL) { params = { dialect: 'postgres', protocol: 'postgres', logging: false, dialectOptions: { ssl: true } }; }
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

// TODO we will need to refer to the Room ID when there are multiple room instances
const Room = sequelize.define('room', {
  indexKey: Sequelize.INTEGER,
  startTime: Sequelize.DATE,
});

// Video.sync({ force: true })

// Room.sync({ force: true }).then(() => {
//   return Room.create({
//     indexKey: 0,
//     startTime: Date.now(),
//   });
// });

Video.sync({ force: true }).then(() => {
  return Video.create({
    videoName: 'sample video name',
    creator: 'sample video creator',
    url: 'jhFDyDgMVUI',
    description: 'description',
  });
});

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
const getIndex = () => Room.findById(1).then(room => room.dataValues.indexKey);
const getRoomProperties = () => Room.findById(1).then(room => room.dataValues);
const incrementIndex = () => Room.findById(1).then(room => room.increment('indexKey'));
const removeFromPlaylist = title => Video.find({ where: { videoName: title } }).then(video => video.destroy());
const resetRoomIndex = () => Room.findById(1).then(room => room.update({ indexKey: 0 }));
const setStartTime = () => Room.findById(1).then(room => room.update({ startTime: Date.now() }));

exports.storeVideoInDatabase = storeVideoInDatabase;
exports.findVideos = findVideos;
exports.getIndex = getIndex;
exports.getRoomProperties = getRoomProperties;
exports.incrementIndex = incrementIndex;
exports.removeFromPlaylist = removeFromPlaylist;
exports.resetRoomIndex = resetRoomIndex;
exports.setStartTime = setStartTime;
