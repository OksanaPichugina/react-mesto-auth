import PopupWithForm from "./PopupWithForm.jsx";
import React from "react";
import { CardContext } from "../contexts/CardContext.jsx";
export default function AddPlacePopup(props) {
  const card = React.useContext(CardContext);
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");
  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [!props.isOpen]);
  function handleChangePlace(e) {
    setPlace(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateCards(place, link);
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"add"}
      title={"Новое место"}
      onSubmit={handleSubmit}
      buttonText = {'Создать'}
      closeAllPopups={props.closeAllPopups}
    >
      <input
        name="place"
        id="place-input"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={place}
        onChange={handleChangePlace}
      />
      <span className="popup__input-error place-input-error "></span>
      <input
        name="link"
        id="link-input"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error link-input-error "></span>
    </PopupWithForm>
  );
}
