import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as recipes from '../fetcher/recipes'

class EditRecipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipe: {},
      name: '',
      ingredients: '',
      howToCook: '',
      img: '',
    }
  }

  inputChange = (e, key) => {
    let recipe = this.state.recipe
    recipe[key] = e.target.value
    this.setState(recipe)
  }

  onSubmit = e => {
    e.preventDefault()
    let howToCook = []
    if (typeof this.state.howToCook === 'string' && this.state.howToCook.length > 0) {
      howToCook =
        this.state.howToCook.split(',').map(item => item.trim())
    }
    let recipe = this.state.recipe
    recipe.howToCook = howToCook
    let toReturn = this.validateRecipe(recipe)
    if (toReturn)
      return
    recipes.update(recipe).then(() => {
      this.props.createNotification('info', 'Recipe updated')
      this.props.history.goBack()
    })
  }

  componentDidMount() {
    let id = this.props.match.params.recipeId
    recipes.getRecipeById(id).then(recipe => {
      let howToCook = recipe.howToCook
      this.setState({
        recipe,
        howToCook,
        name: recipe.name,
        ingredients: recipe.ingredients,
        img: recipe.img,
      })
    })
  }

  validateRecipe(recipe) {
    if (recipe.name.length < 3) {
      this.props.createNotification('error', 'Name must be at least 3 symbols long')
      return true
    }
    if (recipe.ingredients.length < 15) {
      this.props.createNotification('error', 'Ingredients must be at least 15 symbols long')
      return true
    }
  }

  render() {
    return (
      <div>
        <div className='App-body-title'><p>EDIT</p></div>
        <form className='App-auth' onSubmit={this.onSubmit}>
          <p>
            Name<input className='App-form-input' value={this.state.name} onChange={e => this.inputChange(e, 'name')} required />
          </p>
          <p>
            Ingredients<textarea className='App-form-input' value={this.state.ingredients} onChange={e => this.inputChange(e, 'ingredients')} required />
          </p>
          <p>
            How to cook<textarea className='App-form-input' value={this.state.howToCook} onChange={e => this.inputChange(e, 'how-to-cook')} />
          </p>
          <p>
            Image Url<input className='App-form-input' type='url' value={this.state.img} onChange={e => this.inputChange(e, 'img')} required />
          </p>
          <input className='App-form-submit' type='submit' />
        </form>
      </div>
    )
  }
}

EditRecipe.propTypes = {
  createNotification: PropTypes.func.isRequired
}

export default EditRecipe
