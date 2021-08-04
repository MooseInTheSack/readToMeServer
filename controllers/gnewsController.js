const Story = require('../models/story.js')

exports.getTopHeadlines = async (req, res) => {
    const allStories = await Story.find({}).sort({date: -1})
    res.send(JSON.stringify(allStories))
}

