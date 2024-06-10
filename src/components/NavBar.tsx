import React, { useState } from 'react';
import classes from './css/Navbar.module.css';
import bluebird from '../assets/bluebird1.png';
const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={classes.Navbar}>
      <div className={classes.Logo}>
        <img src={bluebird} alt="Logo"/>
      </div>
      <button className={classes.ToggleButton} onClick={toggleExpansion}>
        ☰
      </button>
      <div className={`${classes.Links} ${isExpanded ? classes.Expanded : ''}`}>
        <a href="#">Features</a>
        <a href="#">Solutions</a>
        <a href="#">Resources</a>
        <a href="about">About</a>
        <a href="#" className={classes.SignIn}>Sign In</a>
        <a href="#" className={classes.StartForFree} style={{color: 'black'}}>Start For Free</a>
      </div>
    </nav>
  );
};

export default Navbar;
