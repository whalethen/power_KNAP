const rp = require('request-promise');
// const config = require('../config.js');
const isoConvert = require('convert-iso8601-duration');
const env = require('../.env')

exports.grabVideos = (query) => {
  const options = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    qs: {
      key: process.env.YT_API_KEY,
      q: query,
      type: 'video',
      part: 'snippet',
    },
    json: true,
  };
  return rp(options);
};

exports.grabVideoLength = (videoId) => {
  const options = {
    url: 'https://www.googleapis.com/youtube/v3/videos',
    qs: {
      key: process.env.YT_API_KEY,
      part: 'contentDetails',
      id: videoId,
    },
    json: true,
  };
  return rp(options)
    .then(results => isoConvert(results.items[0].contentDetails.duration));
};
