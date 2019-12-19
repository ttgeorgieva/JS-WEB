export async function getRecipesByCategoryName (categoryName) {
  let recipes = []
  await fetch('http://localhost:1337/api/recipes/category=' + categoryName)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      recipes = response
    })
  return recipes
}

export async function getRecipeById (recipeId) {
  let recipe = {}
  await fetch('http://localhost:1337/api/recipes/recipes=' + recipeId)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      recipe = response
    })
  return recipe
  
}

export async function getNewRecipes () {
  let recipes = []
  await fetch('http://localhost:1337/api/recipes/new')
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      recipes = response
    })
  return recipes
}

export async function getRecipesByArray (array) {
  let recipes = []
  await fetch('http://localhost:1337/api/recipes/array=' + array)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      recipes = response
    })
  return recipes
}

export async function create (recipe) {
  await fetch('http://localhost:1337/api/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then()
}

export async function update (recipe) {
  await fetch('http://localhost:1337/api/recipes', {
    method: 'PUT',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then()
}
