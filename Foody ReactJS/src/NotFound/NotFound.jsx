import React from 'react';
import './NotFound.css';
import image from "./404.png";

export default function NotFound() {
    return <div className='errorPage'>
     <img alt="404" src={image}></img>
     <p>That`s an error. <br/>The requested URL was not found on this server.</p>
    </div>
}