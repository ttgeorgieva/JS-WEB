const users = require('./users-service')
const categories = require('./categories-sevice').default
const recipes = require('./recipes-service')
const comments = require('./comments-service')


module.exports = {
  users,
  categories,
  recipes,
  comments
}
