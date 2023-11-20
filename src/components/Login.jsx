import Header from "./Header.jsx";
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from './Auth.jsx';
export default function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formValue.email || !formValue.password){
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.jwt){
          setFormValue({email: '', password: ''});
          props.handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <>
      <Header text="Регистрация"  email='' linktostr='/sign-up'/>
      <form className="popup__form_log" onSubmit={handleSubmit}>
        <h2 className="popup__title_log">Вход</h2>
        <div className="form_dop">
          <input
            name="email"
            id="email-input"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            className="popup__input_log"
            value={formValue.email} onChange={handleChange}
          />
          <input
            name="password"
            id="password-input"
            type="text"
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
            className="popup__input_log"
            value={formValue.password} onChange={handleChange}
          />
        </div>
        <button type="submit" className="popup__button-save_log" onSubmit={handleSubmit}>
          Войти
        </button>
      </form>
    </>
  );
}
