const mongoose = require('mongoose')
const storySchema = require('../models/story').Story
const Story = mongoose.model('Story', storySchema);

exports.topStories = async function(req, res) {
    //find
    const results = await Story.find({}, (err) => {
        if(err) {
            res.send({status: 500, message: "Error finding stories"})
        }
    })
    
    res.send({status: 201, content: results})
}