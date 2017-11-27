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
  name: Sequelize.STRING,
});

Video.sync({ force: true });
Room.sync({ force: true });

const createVideoEntry = (videoData) => {
  const videoEntry = {
    videoName: videoData.title,
    creator: videoData.creator,
    url: videoData.url,
    description: videoData.description,
  };
  return Video.create(videoEntry); // returns a promise when called
};

const createRoomEntry = (roomName) => {
  const roomEntry = {
    indexKey: 0,
    startTime: null,
    name: roomName,
  };
  return Room.create(roomEntry); // returns a promise when called
};

// Room queries
const findRooms = () => Room.findAll();
const getRoomProperties = roomId => Room.findById(roomId).then(room => room.dataValues);
const setStartTime = roomId => Room.findById(roomId).then(room => room.update({ startTime: Date.now() }));
const getIndex = roomId => Room.findById(roomId).then(room => room.dataValues.indexKey);
const resetRoomIndex = roomId => Room.findById(roomId).then(room => room.update({ indexKey: 0 }));
const incrementIndex = roomId => Room.findById(roomId).then(room => room.increment('indexKey'));
const removeFromPlaylist = title => Video.find({ where: { videoName: title } }).then(video => video.destroy());

// Video queries
const findVideos = () => Video.findAll();

exports.createRoomEntry = createRoomEntry;
exports.createVideoEntry = createVideoEntry;
exports.findRooms = findRooms;
exports.findVideos = findVideos;
exports.getIndex = getIndex;
exports.resetRoomIndex = resetRoomIndex;
exports.incrementIndex = incrementIndex;
exports.setStartTime = setStartTime;
exports.getRoomProperties = getRoomProperties;
exports.removeFromPlaylist = removeFromPlaylist;
