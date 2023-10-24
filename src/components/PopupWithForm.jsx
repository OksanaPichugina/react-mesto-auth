export default function PopupWithForm(props) {
  return (
    <div
      id={`${props.name}-form`}
      className={props.isOpen ? "popup popup_opened" : "popup"}
    >
      <div className="popup__container">
        <form
          onSubmit={props.onSubmit}
          id={`${props.name}-form`}
          className="popup__form"
          name={`form-${props.name}`}
        >
          <h2 className="popup__title">{`${props.title}`}</h2>
          <div className="form_dop">{props.children}</div>
          <button type="submit" className="popup__submit popup__button-save">
            Сохранить
          </button>
        </form>
        <button
          type="button"
          id="close-popup"
          className="popup__close-button"
          onClick={props.closeAllPopups}
        ></button>
      </div>
    </div>
  );
}
