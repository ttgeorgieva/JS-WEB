//const Recipe = require('mongoose').model('Recipe')
const Recipe = require('./../models/Recipe.js');

async function createRecipe (recipe) {
  let newRecipe = await Recipe.create(recipe)
  return newRecipe
}

async function getAllRecipesByCategory (category) {
  let recipes = await Recipe.find({ categoryName: category })
  return recipes
}

async function getRecipeById (recipeId) {
  let recipe = await Recipe.findById(recipeId)
  return recipe
}


async function getNewRecipes () {
  let recipes = await Recipe.find({}).sort('-date')
  return recipes
}

async function getAllRecipesByArrayOfIds (array) {
  let recipes = await Recipe.find({ '_id': { $in: array } })
  return recipes
}

async function updateRecipe (recipeId, newRecipe) {
  await Recipe.findById(recipeId, (err, recipe) => {
    if (err) {
      console.log(err)
    }
    recipe.name = newRecipe.name
    recipe.ingredients = newRecipe.ingredients
    recipe.howToCook = newRecipe.howToCook
    recipe.img = newRecipe.img    

    recipe.save((err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}

module.exports = {
  getAllRecipesByCategory,
  getRecipeById,
  getNewRecipes,
  getAllRecipesByArrayOfIds,
  createRecipe,
  updateRecipe
}
