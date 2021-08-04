require('dotenv').config();

const axios = require('axios');
const moment = require('moment');
const Story = require('../models/story.js')

const topicChoices = ["breaking-news", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"]

const getTopHeadlines = async () => {

    const API_TOKEN = process.env.GNEWS_API_KEY

    const numberOfCurrentStories = await Story.countDocuments();

    axios.get(`https://gnews.io/api/v4/top-headlines?token=${API_TOKEN}&max=100&lang=en&expand=content`)
        .then((response) => {

            if(numberOfCurrentStories > 100) {
                var older_than = moment().subtract(3, 'days').toDate();
                Story.find({ date_saved: { $lte: older_than } }).deleteMany({}).exec().then((RemoveStatus) => {
                    console.log("Documents Removed Successfully");
                    console.log('RemoveStatus: ', RemoveStatus)
                }).catch((err) => {
                    console.error('something error');
                    console.error(err);
                })
            }
            
            response.data.articles.forEach(article => {
                
                Story.find({ title: article.title, source: article.source.name}, (err, results) => {
                    if(err) {
                        console.log("Error finding stories in the gnews retriever: ", err)
                    }
                
                    if(results && results.length === 0) {
                        Story.create({
                            title: article.title,
                            description: article.description,
                            text: article.content,
                            date: article.publishedAt,
                            source: article.source.name
                        }, function (err, small) {
                            if (err) {
                                console.log('Error creating Stories in the gnews retriever: ', err)
                                throw err;
                            }
    
                            // saved!
                            console.log("Successfully saved gnews stories")
                        });
                    } else {
                        console.log('Story not added to database because it already exists')
                    }

                });
            
            })
        })
        .catch((err) => {
            console.log('Error in gnews retriever: ', err)
        })

}

module.exports = { getTopHeadlines }

