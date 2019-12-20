import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as users from '../fetcher/users'
import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  inputChange = (e, key) => {
    let state = this.state
    state[key] = e.target.value
    this.setState(state)
  }

  formSubmit = e => {
    e.preventDefault()
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    users.login(user).then( res => {
      if (typeof res === 'object') {
        this.props.createNotification('success', 'Logged in')
        this.props.checkIsLogged()
        this.props.history.push('/')
      } else {
        this.props.createNotification('error', res)
      }
    }) 
  }

  render() {
    return (
      <div className='App-body-container'>
        <div className='App-body-title'><p>Login</p></div>
        <div className='App-body-error'><p>{this.state.error}</p></div>
        <form className='App-auth' onSubmit={this.formSubmit}>
          <p>
            <label>
              Username<input className='App-form-input' type='text' id='username' name='username'
                value={this.state.username} onChange={(e) => this.inputChange(e, 'username')} required />
            </label>
          </p>
          <p>
            <label>
              Password<input className='App-form-input' type='password' id='password' name='password'
                value={this.state.password} onChange={(e) => this.inputChange(e, 'password')} required />
            </label>
          </p>
          <input className='App-form-submit' type='submit' id='submit' name='password' />
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  createNotification: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  updateAppState: PropTypes.func.isRequired
}

export default Login