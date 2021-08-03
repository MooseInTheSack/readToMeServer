require('dotenv').config();

const axios = require('axios');
const Story = require('../models/story.js')

const topicChoices = ["breaking-news", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"]

const getTopHeadlines = async () => {

    const API_TOKEN = process.env.GNEWS_API_KEY

    axios.get(`https://gnews.io/api/v4/top-headlines?token=${API_TOKEN}&max=100&lang=en&expand=content`)
        .then((response) => {
            //if(response.data && response.data.articles) {
                //console.log('ducky data.articles: ', response.data.articles)
            //}
            
            response.data.articles.forEach(article => {
                Story.create({
                    title: article.title,
                    description: article.description,
                    text: article.content,
                    date: article.publishedAt,
                    source: article.source.name
                }, function (err, small) {
                    if (err) {
                        console.log('Error creating Stories: ', err)
                        throw err;
                    }

                    // saved!
                    console.log("ducky successfully saved gnews stories")
                });
            
            })
        })
        .catch((err) => {
            console.log('ducky error in gnews retriever: ', err)
        })

}

module.exports = { getTopHeadlines }

