import Header from "./Header.jsx";
import * as auth from './Auth.jsx';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
export default function Register() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

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
    // здесь обработчик регистрации
    
      const { password, email } = formValue;
      auth.register(password, email).then((res) => {
        navigate('/sign-in', {replace: true});
      })
    
  }
  return (
    <>
      <Header text="Вход" linktostr='/sign-in'/>
      <form className="popup__form_log" onSubmit={handleSubmit}>
        <h2 className="popup__title_log">Регистрация</h2>
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
            onChange={handleChange}
            value={formValue.email}
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
            onChange={handleChange}
            value={formValue.password}
          />
        </div>
        <button type="submit" className="popup__button-save_log" onSubmit={handleSubmit}>
          Зарегистироваться
        </button>
        <p className="popup__text_log">
          Уже зарегистрированы?
          <Link to="/sign-in" className="popup__text_link"> Войти</Link>
        </p>
      </form>
    </>
  );
}
