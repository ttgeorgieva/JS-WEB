import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Recipe extends Component {
  render () {
    return (
      <Link className='App-recipe' to={'/details/' + this.props.recipe._id}>
        <p>{this.props.recipe.name}</p>
        <img className='App-img-recipe' src={this.props.recipe.img} alt='foody' />
      </Link>
    )
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
}

export default Recipe
