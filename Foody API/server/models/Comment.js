const mongoose = require('mongoose')

let commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  recipeId: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: new Date(Date.now()) }
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment