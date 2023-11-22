import Header from "./Header.jsx";
import * as auth from "./Auth.jsx";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .handleRegister({ password, email })
      .then(resetForm)
      .then(() => navigate("/sign-in"))
      .catch(() => console.log("Что-то пошло не так"));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header text="Вход" linktostr="/sign-in" loggedIn = {props.loggedIn}/>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="popup__button-save_log"
          onSubmit={handleSubmit}
        >
          Зарегистироваться
        </button>
        <p className="popup__text_log">
          Уже зарегистрированы?
          <Link to="/sign-in" className="popup__text_link">
            {" "}
            Войти
          </Link>
        </p>
      </form>
    </>
  );
}
