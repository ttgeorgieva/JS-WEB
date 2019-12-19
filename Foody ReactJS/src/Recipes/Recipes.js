import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';

class Recipes extends Component {

  constructor(props) {
    super(props)

    this.state = {
        recipes: []
    }
}



  render() {
    let recipesList
    if (this.props.recipes && this.props.recipes.length > 0 && typeof this.props.recipes !== 'string') {
      recipesList =
        this.props.recipes.map((recipe, index) => {
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
