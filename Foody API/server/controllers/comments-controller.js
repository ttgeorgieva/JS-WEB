const services = require('../services')

module.exports = {
  createComment: async (req, res) => {
    let comment = req.body
    res.json(await services.comments.createComment(comment))
  },
  getCommentsByRecipeId: async (req, res) => {
    let recipeId = req.params.recipeId
    res.json(await services.comments.getCommentsByRecipeId(recipeId))
  },
  updateComment: async (req, res) => {
    let comment = req.body
    let commentId = comment._id
    await services.comments.updateComment(commentId, comment)
    res.json({ message: 'Comment updated!' })
  },
  deleteComment: async (req, res) => {
    let commentId = req.params.commentId
    await services.comments.deleteComment(commentId)
    res.json({ message: 'Comment deleted!' })
  }
}
