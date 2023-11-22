import Header from "./Header.jsx";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "./Auth.jsx";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin({ password, email })
    .then(
      () => {
        resetForm(); // Сброс значений email и password
        console.log(email);
      }
    )
    .then(() => navigate("/"))
    .catch(() => console.log("Что-то пошло не так!!!"));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header text="Регистрация" email="" linktostr="/sign-up" loggedIn = {props.loggedIn} />
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="popup__button-save_log"
          onSubmit={handleSubmit}
        >
          Войти
        </button>
      </form>
    </>
  );
}
