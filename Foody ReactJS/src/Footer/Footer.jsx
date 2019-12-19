import React from 'react';
import './Footer.css';
//import Link from "../Link/Link";
import logoFooter from './logo-food.png';

function Footer() {
    return (
        <div>
            <footer className='footer'>
                <div className='container'>
                    <img id='logoFooter' src={logoFooter} alt="my-app-logo"></img>
                    <div className='column'>
                        <p>"You are what you eat."</p>
                    </div>
                </div>
            </footer>
        </div>
    )
    //return (<nav className="Footer">
    // <ul>
    //<Link to="/">
    // <img id='logo' src={logo} alt="my-app-logo"></img>
    // </Link>

    // </ul>
    //</nav>)
};

export default Footer;