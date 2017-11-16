const rp = require('request-promise');
const config = require('../config.js');
const isoConvert = require('convert-iso8601-duration');

exports.youtubeVideos = (query) => {
  const options = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    qs: {
      key: config.config.YT_API_KEY,
      q: query,
      type: 'video',
      part: 'snippet',
    },
    json: true,
  };
  return rp(options)
    .then(videos => videos)
    .catch(err => (`Could have retrieve YouTube search results. ${err}`));
};

// youtubeVideo('cats');

exports.videoLength = (videoId) => {
  const options = {
    url: 'https://www.googleapis.com/youtube/v3/videos',
    qs: {
      key: config.config.YT_API_KEY,
      part: 'contentDetails',
      id: videoId,
    },
    json: true,
  };
  rp(options)
    .then(results => console.log(`success, video is ${isoConvert(results.items[0].contentDetails.duration)} seconds`))
    .catch(err => console.error(`Could not retrieve YouTube search results:`, err));
};

// videoLength('7lCDEYXw3mM');
