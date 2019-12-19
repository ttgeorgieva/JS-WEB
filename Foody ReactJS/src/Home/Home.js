import React, { Component } from 'react'
import Recipes from '../Recipes/Recipes';

import * as recipes from '../fetcher/recipes'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newRecipes: []
        }
    }

    componentDidMount() {
       recipes.getNewRecipes().then(newRecipes => {
            this.setState({ newRecipes })
          })
    }

    render() {
        return (
            <div>
                <div className='App-body-title'><p>New Recipes</p></div>
                <Recipes
                    recipes={this.state.newRecipes.slice(0, 3)}
                />
            </div>
        )
    }
}

export default Home
