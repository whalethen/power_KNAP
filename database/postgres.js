require('dotenv').config();
const Sequelize = require('sequelize');

let params = {};
if (!process.env.LOCAL) {
  params = {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: { ssl: true },
  };
}
const sequelize = new Sequelize(process.env.DATABASE_URL, params);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(err => console.error('Unable to connect to database:', err));

const Video = sequelize.define('video', {
  videoName: Sequelize.STRING,
  creator: Sequelize.STRING,
  url: Sequelize.STRING,
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  description: Sequelize.STRING,
  roomId: Sequelize.STRING,
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

// Room.hasMany(Video, { as: 'Videos' });

const checkIfTablesExists = () => {
  Video.sync();
  Room.sync();
};

checkIfTablesExists();

const createVideoEntry = (videoData) => {
  const videoEntry = {
    videoName: videoData.title,
    creator: videoData.creator,
    url: videoData.url,
    description: videoData.description,
    roomId: videoData.roomId,
  };
  return Video.create(videoEntry);
};

const createRoomEntry = (roomName) => {
  const roomEntry = {
    indexKey: 0,
    startTime: null,
    name: roomName,
  };
  return Room.create(roomEntry); // returns a promise when called
};

const changeVotes = (video, action) => {
  const name = video.videoName;
  if (action === '+') {
    return Video.update(
      { votes: Sequelize.literal('votes + 1') },
      { where: { videoName: name } } // eslint-disable-line comma-dangle
    );
  } else if (action === '-') {
    return Video.update(
      { votes: Sequelize.literal('votes - 1') },
      { where: { videoName: name } } // eslint-disable-line comma-dangle
    );
  }
};

// Room Queries
const findRooms = () => Room.findAll();
const findRoomById = roomId => Room.findById(roomId);
const getRoomProperties = roomId => Room.findById(roomId).then(room => room.dataValues);
const incrementIndex = roomId => Room.findById(roomId).then(room => room.increment('indexKey'));
const resetRoomIndex = roomId => Room.findById(roomId).then(room => room.update({ indexKey: 0 }));
const getIndex = roomId => Room.findById(roomId).then(room => room.dataValues.indexKey);
const setStartTime = roomId => Room.findById(roomId).then(room => room.update({ startTime: Date.now() }));

// Video Queries
const findVideos = roomId => Video.findAll({ where: { roomId } });
const removeFromPlaylist = (title, roomId) => {
  return Video.find({ where: { videoName: title, roomId } })
    .then(video => video.destroy());
};

exports.findRoomById = findRoomById;
exports.createRoomEntry = createRoomEntry;
exports.findRooms = findRooms;
exports.createVideoEntry = createVideoEntry;
exports.getRoomProperties = getRoomProperties;
exports.incrementIndex = incrementIndex;
exports.resetRoomIndex = resetRoomIndex;
exports.getIndex = getIndex;
exports.setStartTime = setStartTime;
exports.findVideos = findVideos;
exports.removeFromPlaylist = removeFromPlaylist;
exports.changeVotes = changeVotes;