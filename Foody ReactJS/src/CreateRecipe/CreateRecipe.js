import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as recipes from '../fetcher/recipes'

class CreateRecipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      ingredients: '',
      howToCook: '',
      imgUrl: ''
      
    }
  }

  inputChange = (e, key) => {
    let state = this.state
    state[key] = e.target.value
    this.setState(state)
  }

  onSubmit = e => {
    e.preventDefault()
    let recipe = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      howToCook: this.state.howToCook,
      img: this.state.imgUrl,
      categoryName: this.props.match.params.categoryName,
    }

    let toReturn = this.validateRecipe(recipe)
    if (toReturn)
      return
    recipes.create(recipe).then(() => {
      this.props.createNotification('success', 'Recipe created')
      this.props.history.push("/recipes")
    })
  }

  validateRecipe(recipe) {
    if (recipe.name.length < 3) {
      this.props.createNotification('error', 'Name must be at least 3 symbols long')
      return true
    }
    if (recipe.ingredients.length < 5) {
      this.props.createNotification('error', 'Ingredients must be at least 5 symbols long')
      return true
    }
  }

  render() {
    return (
      <div className='App-body-container'>
        <div className='App-body-title'><p>CREATE</p></div>
        <form className='App-auth' onSubmit={this.onSubmit}>
          <p>
            Name<input className='App-form-input' value={this.state.name} onChange={e => this.inputChange(e, 'name')} required />
          </p>
          <p>
            Ingredients<input className='App-form-input' type='text' value={this.state.ingredients} onChange={e => this.inputChange(e, 'ingredients')} required />
          </p>
          <p>
            How to cook<textarea className='App-form-input' value={this.state.value} onChange={e => this.inputChange(e, 'howToCook')} required />
          </p>
          <p>
            Image Url<input className='App-form-input' type='url' value={this.state.imgUrl} onChange={e => this.inputChange(e, 'imgUrl')} required />
          </p>
          <input className='App-form-submit' type='submit' />
        </form>
      </div>
    )
  }
}

CreateRecipe.propTypes = {
  createNotification: PropTypes.func.isRequired
}

export default CreateRecipe;
