const Comment = require('mongoose').model('Comment')

async function createComment (comment) {
  return await Comment.create(comment)
}

async function getCommentsByRecipeId (recipeId) {
  let comment = await Comment.find({ recipeId }).sort('date')
  return comment
}

async function deleteComment (commentId) {
  await Comment.deleteOne({ _id: commentId })
}

async function updateComment (commentId, newComment) {
  await Comment.findById(commentId, (err, comment) => {
    if (err) {
      console.log(err)
    }
    comment.text = newComment.text

    comment.save((err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}

module.exports = {
  createComment,
  getCommentsByRecipeId,
  deleteComment,
  updateComment
}
