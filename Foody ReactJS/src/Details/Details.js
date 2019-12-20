import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Details.css';
import { Link } from 'react-router-dom';


import * as recipes from '../fetcher/recipes'
import * as comments from '../fetcher/comments'

import Comments from '../Comments/Comments'

class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: {},
            comments: [],
            user: JSON.parse(localStorage.getItem('user')),
            isAdded: false
        }
    }

    updateComment = comment => {
        comments.updateComment(comment).then()
    }

    deleteComment = commentId => {
        comments.deleteComment(commentId).then(() => {
            this.fetchComments(this.state.recipe._id)
        })
    }

    addComment = comment => {
        comments.createComment(comment).then((newComment) => {
            this.setState({ comments: [...this.state.comments, newComment] })
        })
    }

    addRecipeToFavorites = () => {
        let id = this.props.match.params.recipeId
        let user = this.state.user
        if (!this.state.isAdded) {
            this.props.createNotification('info', 'Added to favorites')
            user.favorites = [...user.favorites, id]
        } else {
            this.props.createNotification('info', 'Removed from favorites')
            user.favorites = user.favorites.filter(x => x !== id)
        }
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({ isAdded: !this.state.isAdded, user })
        this.props.update(user)
    }

    formatHowToCook(data) {
        let result = ''
        for (const key in data) {
            result += key + ': ' + data[key] + '<br />'
        }
        return result
    }

    fetchComments(id) {
        comments.getRecipeComments(id).then(comments => {
            this.setState({ comments })
        })
    }

    componentDidMount() {
        let id = this.props.match.params.recipeId
        recipes.getRecipeById(id).then(recipe => {
            this.setState({ recipe })
        })

        this.fetchComments(id)
        if (this.state.user) {
            this.setState({
                isAdded: this.state.user.favorites
                    .indexOf(this.props.match.params.recipeId) > -1
            })
        }
    }

    render() {
        let recipe = this.state.recipe
        let howToCook = '';
        if (recipe.howToCook && recipe.howToCook.length > 0) {
            howToCook = recipe.howToCook
        }
        let user = localStorage.getItem('user')
        let addToFavorites = user
            ?
            <button className='App-add-to-favorites-btn' onClick={this.addRecipeToFavorites}>
                {this.state.isAdded
                    ?
                    'Remove from favorites'
                    :
                    'Add to favorites'}
            </button>
            : ''

        let editRecipe = this.props.isLogged ?
            <button className='App-edit-btn'>
                <Link className='App-create-link' to={`/edit/${this.props.match.params.recipeId}`}>
                    Edit recipe
                </Link>
            </button>
            : ''

        return (
            <div className='App-body'>
                {recipe !== {}
                    ? <div>
                        <div>
                            {addToFavorites}
                            <p className='App-recipe-title'>{recipe.name}</p>
                            <div className='App-details-img-container'>
                                <img className='App-details-img' src={this.state.recipe.img} alt={this.state.recipe.name} />
                            </div>
                        </div>
                        <div className='App-details'>
                            <p className='App-ingredients'>Ingredients:</p>
                            <p className='App-text'>{recipe.ingredients}</p>
                            <p className='App-how-to-cook'>How to cook:</p>
                            <p className='App-text'>{howToCook}</p>
                            {editRecipe}
                        </div>
                    </div>
                    : 'Loading...'}

                {this.state.user
                    ? <Comments
                        recipeId={this.state.recipe._id}
                        comments={this.state.comments}
                        author={this.state.user.username}
                        addComment={this.addComment}
                        deleteComment={this.deleteComment}
                        updateComment={this.updateComment}
                        createNotification={this.props.createNotification}
                    />
                    : ''}
            </div>
        )
    }
}

Details.propTypes = {
    update: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired
}

export default Details
