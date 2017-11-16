const rp = require('request-promise');
const config = require('../config');

const fetchYoutubeVideo = (query) => {
  let params = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    method: 'GET',
    qs: {
      key: config.YT_API_KEY,
      q: query,
      type: 'video',
      part: 'snippet',
    },
  };
  rp(params)
    .then(results => console.log('success: ', results))
    .catch(err => console.error('Could have retrieve Youtube search results: ', err));
};

fetchYoutubeVideo('cats');
