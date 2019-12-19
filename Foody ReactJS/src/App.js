import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications'
import * as users from './fetcher/users'
import * as recipes from './fetcher/recipes'

import './App.css';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import Register from './Register/Register';
import Logout from './Logout/Logout';
import Recipes from './Recipes/Recipes';
import CreateRecipe from './CreateRecipe/CreateRecipe';
import Details from './Details/Details';
import EditRecipe from './Edit/EditRecipe';
import Favorites from './Favorites/Favorites'
import NotFound from './NotFound/NotFound';

// function render(title, Cmp) {
//   return function ({ match }) {
//     return <Main title={title}><Cmp match={match} /></Main>
//   }
// }

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: localStorage.getItem('user'),
      isLogged: localStorage.getItem('user') ? true : false,
      recipes: []
    }
  }

  createNotification = (type, message) => {
    switch (type) {
      case 'info':
        NotificationManager.info(message, '', 2000);
        break;
      case 'success':
        NotificationManager.success(message, '', 2000);
        break;
      case 'warning':
        NotificationManager.warning(message, '', 2000);
        break;
      default:
        NotificationManager.error(message, '', 2000);
        break;
    }
  }


  logout = () => {
    users.logout()
    this.checkIsLogged()
  }

  update = user => {
    users.update(user)
  }

  checkIsLogged = () => {
    let user = localStorage.getItem('user')
    this.setState({
      user,
      isLogged: user ? true : false
    })
  }


  componentDidMount() {
    this.checkIsLogged()
    recipes.getNewRecipes().then(recipes => {
      this.setState({ recipes })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation isLogged={this.state.isLogged}/>
          <NotificationContainer />
          <div className='Container'>
            <Switch>
              <Route path='/' exact className="nav-item" component={Home} />
              <Route path='/favorites' exact className="nav-item" component={Favorites} />
              <Route path='/recipes' className="nav-item" render={props => <Recipes {...props} recipes={this.state.recipes} createNotification={this.createNotification} />} />
              <Route path='/create-recipe' className="nav-item" render={props => <CreateRecipe {...props} createNotification={this.createNotification}/>} />
              <Route path='/logout' className="nav-item" render={props => <Logout {...props} logout={this.logout} createNotification={this.createNotification} />} />
              <Route path='/register' className="nav-item" render={props => <Register {...props} createNotification={this.createNotification} checkIsLogged={this.checkIsLogged} />} />
              <Route path='/login' className="nav-item" render={props => <Login {...props} login={this.login} createNotification={this.createNotification} checkIsLogged={this.checkIsLogged} />} />
              <Route path='/details/:recipeId' className="nav-item" exact render={props => <Details {...props} isLogged={this.state.isLogged} update={this.update} createNotification={this.createNotification} />} />
              <Route path='/edit/:recipeId' render={props => <EditRecipe {...props} createNotification={this.createNotification} />} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
