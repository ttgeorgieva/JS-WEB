import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comments.css';

import Comment from './Comment'

class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      text: '',
      comments: this.props.comments
    }
  }

  inputChange = (e, key) => {
    let state = this.state
    state[key] = e.target.value
    this.setState(state)
  }

  handleBtnOnClick = () => {
    if (this.state.isEditing) {
      let comment = {
        text: this.state.text,
        recipeId: this.props.recipeId,
        author: JSON.parse(localStorage.getItem('user')).username
      }
      if (comment.text !== '') {
        this.props.createNotification('success', 'Comment created')
        this.props.addComment(comment)
      } else {
        this.props.createNotification('warning', 'You cannot post an empty comment')
      }
    }
    this.setState({ isEditing: !this.state.isEditing, text: '' })
  }

  render() {
  
    let comments = this.props.comments.map((comment, index) => {
      return (
        <Comment
          key={comment._id}
          comment={comment}
          isCreator={this.props.author === comment.author}
          deleteComment={this.props.deleteComment}
          updateComment={this.props.updateComment}
          createNotification={this.props.createNotification}
        />
      )
    })

    let button = this.state.isEditing ? 'Post new comment' : 'Add new comment'
    let input = this.state.isEditing ? <input className='App-add-comment-input' type='text'
      value={this.state.text} onChange={(e) => this.inputChange(e, 'text')} required /> : ''

    return (
      <div className='App-comments'>
        <div className='App-body-title-comments'><p>Comments</p></div>
        <div className='App-details-comments'>
          {comments}
          <div className='App-add-comment-btn'>
            {input}
            <button className='App-add-comment' onClick={this.handleBtnOnClick}>
              {button}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Comments.propTypes = {
  recipeId: PropTypes.string,
  comments: PropTypes.array.isRequired,
  author: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default Comments
