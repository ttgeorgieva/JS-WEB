const mongoose = require('mongoose')

let recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: new Date(Date.now()) },
  ingredients: { type: String, required: true },
  howToCook: { type: String, required: true },
  img: { type: String, required: true },
  categoryName: { type: String, required: false },
})

let Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe