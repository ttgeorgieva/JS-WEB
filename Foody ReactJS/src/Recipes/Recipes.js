import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as recipesFetcher from '../fetcher/recipes'

import Recipe from './Recipe'

class Recipes extends Component {

  constructor(props) {
    super(props)

    this.state = {
        recipes: []
    }
}

componentDidMount() {
  recipesFetcher.getNewRecipes().then(newRecipes => {
        this.setState({ recipes: newRecipes })
      })
}

  render() {
    let recipesList
    if (this.state.recipes && this.state.recipes.length > 0) {
      recipesList =
        this.state.recipes.map((recipe, index) => {
          return <Recipe
            key={index}
            recipe={recipe}
          />
        })
    } else {
      recipesList = <div className='App-no-recipes'><i>No recipes added yet.</i></div>
    }

    return (
      <div>
        {recipesList}
      </div>
    )
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired
}

export default Recipes
