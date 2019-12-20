import React from 'react';
import './Footer.css';
//import Link from "../Link/Link";
import logoFooter from './logo-food.png';

function Footer() {
    return (
        <div className='footer'>
            <footer >
                <div className='container'>
                    <img id='logoFooter' src={logoFooter} alt="my-app-logo"></img>
                    <div className='column'>
                        <p>"You are what you eat."</p>
                    </div>
                </div>
            </footer>
        </div>
    )
   
};

export default Footer;