const express = require('express')
const controllers = require('../controllers')

const apiRouter = express.Router()

module.exports = (app) => {
  apiRouter.route('/')
    .get((req, res) => {
      res.json('Connected to Food Api!')
    })

  apiRouter.route('/users')
    .get(controllers.users.allUsers)
    .put(controllers.users.update)

  apiRouter.route('/users/register')
    .post(controllers.users.register)

  apiRouter.route('/users/login')
    .post(controllers.users.login)

  apiRouter.route('/users/logout')
    .post(controllers.users.logout)

  apiRouter.route('/categories')
    .get(controllers.categories.allCategories)

  apiRouter.route('/categories')
    .post(controllers.categories.create)

    apiRouter.route('/comments')
    .post(controllers.comments.createComment)
    .put(controllers.comments.updateComment)

  apiRouter.route('/comments/:recipeId')
    .get(controllers.comments.getCommentsByRecipeId)

  apiRouter.route('/comments/commentId=:commentId')
    .delete(controllers.comments.deleteComment)

  apiRouter.route('/recipes')
    .put(controllers.recipes.updateRecipe)
    .post(controllers.recipes.createRecipe)

  apiRouter.route('/recipes/new')
    .get(controllers.recipes.getNewRecipes)

  apiRouter.route('/recipes/array=:array')
    .get(controllers.recipes.getAllRecipesByArrayOfIds)

  apiRouter.route('/recipes/category=:categoryName')
    .get(controllers.recipes.getAllRecipesByCategory)

  apiRouter.route('/recipes/recipes=:recipeId')
    .get(controllers.recipes.getRecipeById)

  apiRouter.route('*')
    .get((req, res) => res.json('Invalid url. Make sure you have written the correct url and try again'))

  app.use('/api', apiRouter)
}
