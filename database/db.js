const mongoose = require('mongoose')
require('dotenv').config();
if(!process.env.MONGODB_URI) {
    console.error("connectionString missing...")
    process.exit(1)
}

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', err => {
    console.error("MongoDB error: ", err.message)
    process.exit(1)
})
db.once('open', () => console.log("MongoDB Connection successfully established"))

// seed vacation data (if necessary)
const Thread = require('../models/fourChanThread.js')

//const threadListener = require('./models/threadListener')

module.exports = {
  getThreads: async (options = {}) => Thread.find(options),
}