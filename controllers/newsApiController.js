//var Author = require('../models/author');

//
const NewsAPI = require('newsapi');
require('dotenv').config();

const newsAPIKey = process.env.NEWS_API_KEY
const newsapi = new NewsAPI(newsAPIKey);


const getTopHeadlines = (keyword, category, country) => {
    // To query top headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.topHeadlines({
        q: keyword,
        category: category,
        language: 'en',
        country: country
    }).then(response => {
        console.log(response);
        /*
        {
            status: "ok",
            articles: [...]
        }
        */
    });
}

const getTopWSJStories = () => {
    return newsapi.v2.topHeadlines({
        domains: "wsj.com",
        language: 'en',
        country: 'us'
    }).then(response => {
        console.log(response);
        return response
        /*
        {
            status: "ok",
            articles: [...]
        }
        */
    });
}

// Display list of all Authors.
exports.topStories = function(req, res) {
    res.send('Here are your top stories...');
};

exports.topWSJStories = async function(req, res) {
    const topWSJStories = await getTopWSJStories()
    console.log('ducky topWSJStories: ', topWSJStories)
    res.send(JSON.stringify(topWSJStories))
    console.log('ducky done...')
}
