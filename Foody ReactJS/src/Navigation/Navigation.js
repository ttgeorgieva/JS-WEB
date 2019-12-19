import React, { Component } from 'react';
import './Navigation.css';
import logo from './logo-food.png';
import Link from '../Link/Link';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }


    render() {
        let links = this.props.isLogged ?
            <div>
                <Link to='/' className="nav-item">Home</Link>
                <Link to='/recipes' className="nav-item">Recipes</Link>
                <Link to='/create-recipe' className="nav-item">Create Recipe</Link>
                <Link to='/logout' className="nav-item">Logout</Link>
            </div>
            : <div>
                <Link to='/login' className="nav-item">Login</Link>
                <Link to='/register' className="nav-item">Register</Link>
            </div>

        return (
            <div className="navigation">
                <nav>
                    <div className="container">
                        <div className="nav-left">
                            <img id='logo' src={logo} alt="my-app-logo"></img>
                        </div>
                        <div className="nav-menu">
                            {links}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;