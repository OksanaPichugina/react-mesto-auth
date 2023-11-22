import headerLogo from "../images/logo.svg";
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
     {props.loggedIn ? <div className='header__container'>
      <p className="header__text">{props.email}</p>
      <button onClick={props.onSignOut} className='header__button'>
      <Link to={props.linktostr} className="header__text" >{props.text}</Link>
      </button>
      </div>
      :  <React.Fragment key="notLoggedIn">
      <Link to={props.linktostr} className="header__text" >{props.text}</Link>
    </React.Fragment>
      }
    </header>
  );
}
