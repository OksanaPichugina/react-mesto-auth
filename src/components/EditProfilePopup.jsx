import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import React from "react";
export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(name, description);
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
    >
      <input
        name="name"
        id="name-input"
        type="text"
        className="popup__input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-input-error "></span>
      <input
        name="job"
        id="job-input"
        type="text"
        className="popup__input"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error job-input-error "></span>
    </PopupWithForm>
  );
}
