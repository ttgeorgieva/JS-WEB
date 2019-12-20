import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Register.css';
import * as users from '../fetcher/users'


class Register extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        username: '',
        password: '',
        repassword: '',
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
        password: this.state.password,
        repassword: this.state.repassword
      }
      let toReturn = this.validateUserData(user)
      if (toReturn)
        return
      users.register(user).then(res => {
        if (res.code) {
          this.props.createNotification('Error', 'Username already exists')
          return
        }
        this.props.createNotification('success', 'Registered')
        this.props.checkIsLogged()
        this.props.history.push('/')
      })
    }
  
    validateUserData(user) {
      if (user.username.length < 4) {
        this.props.createNotification('error', 'Username should be at least 4 symbols long')
        return true
      }
      if (user.password.length < 3) {
        this.props.createNotification('error', 'Password should be at least 6 symbols long')
        return true
      }
      if (user.repassword.length !== user.password.length) {
        this.props.createNotification('error', "Passwords don't match")
        return true
      }
      return false
    }
  
    render() {
      return (
        <div className='App-body-container'>
          <div className='App-body-title'><p>Register</p></div>
          <form className='form-control' onSubmit={this.formSubmit}>
            <p>
              <label>
                Username<input className='form-control' type='text' id='username' name='username'
                  value={this.state.username} onChange={(e) => this.inputChange(e, 'username')} required />
              </label>
            </p>
            <p>
              <label>
                Password<input className='form-control' type='password' id='password' name='password'
                  value={this.state.password} onChange={(e) => this.inputChange(e, 'password')} required />
              </label>
            </p>
            <p>
              <label>
                Confirm Password<input className='form-control' type='password' id='repassword' name='repassword'
                  value={this.state.repassword} onChange={(e) => this.inputChange(e, 'repassword')} required />
              </label>
            </p>
            <input className='App-form-submit' type='submit' />
          </form>
        </div>
      )
    }
  }
  
  Register.propType = {
    register: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    checkIsLogged: PropTypes.func.isRequired
  }
  
export default Register

// export default function Register(){
//     return <form className='Register'>
//     <div className='form-control'>
//         <label>Username</label>
//         <input type='text' />
//     </div>
//     <div className="form-control">
//         <label>Password</label>
//         <input type='password' />
//     </div>
//     <div className="form-control">
//         <label>Re-Password</label>
//         <input type='password' />
//     </div>
//     <div className='form-control'>
//         <button type='submit'>Register</button>
//     </div>
// </form>
// }