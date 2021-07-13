const mongoose = require('mongoose')

const threadListenerSchema = mongoose.Schema({
  email: String,
  skus: [String],
})
const threadListener = mongoose.model('threadListener',
  threadListenerSchema)

module.exports = threadListener