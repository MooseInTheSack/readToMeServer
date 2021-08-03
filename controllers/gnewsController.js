const Story = require('../models/story.js')

exports.getTopHeadlines = async (req, res) => {
    const allStories = await Story.find({})
    res.send(JSON.stringify(allStories))
}

