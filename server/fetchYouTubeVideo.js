const rp = require('request-promise');

const options = {
  url: 'https://www.googleapis.com/youtube/v3/search',
  part: 'snippet',
  q: 'cats'
}

rp(options)
  .then(res => console.log('success'))
  .catch(err => console.log(err));