import headerLogo from "../images/logo.svg";
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Link to={props.linktostr} className="header__text">{props.text}</Link>
    </header>
  );
}
