import image from "../images/Union.svg";
export default function InfoTooltip(props) {
    return (
      <div
        id="infoTooltip-popup"
        className={props.isOpen ? "popup popup_opened" : "popup"}
      >
        <div className="popup__container popup__container_infoTooltip">
        <img
          className="popup__image_infoTooltip"
          src={image}
        />
        <p className="popup__text_infotooltip">Вы успешно <br/>зарегистрировались!</p>
        <button
          type="button"
          id="close-popup-image"
          onClick={props.closeAllPopups}
          className="popup__close-button"
        ></button>
        </div>
      </div>
    );
  }