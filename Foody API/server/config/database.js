const mongoose = require('mongoose')
const User = require('../models/User')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
const Comment = require('../models/Comment')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
