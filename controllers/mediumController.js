var Feed = require('rss-to-json');

// Display list of all Authors.
exports.mccallisaiahFeed = async function(req, res) {
    var rss = await Feed.load('https://medium.com/feed/@mccallisaiah');
    const formattedRSS = JSON.stringify(rss, null, 3)
    console.log('ducky: ', formattedRSS);
    res.send('Here are your top stories...');
};