const services = require('../services')

module.exports = {
  getAllRecipesByCategory: async (req, res) => {
    let category = req.params.categoryName
    res.json(await services.recipes.getAllRecipesByCategory(category))
  },
  getRecipeById: async (req, res) => {
    let recipeId = req.params.recipeId
    res.json(await services.recipes.getRecipeById(recipeId))
  },
  getNewRecipes: async (req, res) => {
    res.json(await services.recipes.getNewRecipes())
  },
  getAllRecipesByArrayOfIds: async (req, res) => {
    let array = req.params.array.split(',')
    res.json(await services.recipes.getAllRecipesByArrayOfIds(array))
  },
  createRecipe: async (req, res) => {
    let recipe = req.body
    await services.recipes.createRecipe(recipe)
    res.json({ message: 'Recipe created!' })
  },
  updateRecipe: async (req, res) => {
    let recipe = req.body
    let recipeId = recipe._id
    await services.recipes.updateRecipe(recipeId, recipe)
    res.json({ message: 'Recipe updated!' })
  }
}
