import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


const Nav = () =>  {
    return (
        <nav className="nav-bar">
            <ul className= "menu-ul"id="menu">
                <Link to="/"><li href="#" className="title" id="logo">RideRank</li></Link>
                <div className = "menu-align">
                    <Link to="/SignUp"><li href="#" className ="menu-option">Sign Up</li></Link>
                    <Link to="/Rank"><li href="#"className ="menu-option last">Rank</li></Link>
                </div>
            </ul>
        </nav>
    )
}

export default Nav;