import React, { Component } from 'react';
import Recipes from '../Recipes/Recipes';
import * as recipes from '../fetcher/recipes';

class Favorites extends Component {
  constructor (props) {
    super(props)

    this.state = {
        recipes: []
    }
  }

  componentDidMount () {
    let favorites = JSON.parse(localStorage.getItem('user')).favorites
    recipes.getRecipesByArray(favorites).then(recipes => {
      this.setState({ recipes })

    })
  }

  render () {
    return (
      <div>
        <div className='App-body-title'><p>Welcome to your favorites recipes</p></div>
        <Recipes
          recipes={this.state.recipes}
        />
      </div>
    )
  }
}

export default Favorites
