const rp = require('request-promise');
const config = require('../config.js');
const isoConvert = require('convert-iso8601-duration');

const fetchYoutubeVideo = (query) => {
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
  rp(options)
    .then(results => console.log('success: ', results))
    .catch(err => console.error('Could have retrieve Youtube search results: ', err));
};

// fetchYoutubeVideo('cats');

const fetchVideoLength = (videoId) => {
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
    .then(results => console.log('success: ', isoConvert(results.items[0].contentDetails.duration)))
    .catch(err => console.error('Could have retrieve Youtube search results: ', err));
};

// fetchVideoLength('7lCDEYXw3mM');
