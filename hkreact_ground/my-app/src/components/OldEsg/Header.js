import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
      <div className="Havigation">
        <nav>
          <div className="container-fluid">

            <ul className="nav navbar-nav">  
             <li> <Link to="/">My Resume</Link>    </li>    
             <li> <Link to="/connect"> Connect </Link> </li> 
            </ul>

            <ul className="nav navbar-right navbar-nav">  
             <li> {props.children} </li>
            </ul>

  </div> </nav>  </div>

  );
};

export default Header;
