import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul className= "menu-ul"id="menu">
                <Link to="/"><li href="#" className="title" id="logo">RideRank</li></Link>
                <Link to="/SignUp"><li href="#" className ="menu-option">Sign Up</li></Link>
                <Link to="/Rank"><li href="#"className ="menu-option last">Rank</li></Link>
            </ul>
        </nav>
    )
}

export default Nav;