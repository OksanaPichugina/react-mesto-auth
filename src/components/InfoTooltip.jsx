import imageGood from "../images/UnionGood.svg";
import imageBad from "../images/UnionBad.svg";
export default function InfoTooltip(props) {
    return (
      <div
        id="infoTooltip-popup"
        className={props.isOpen ? "popup popup_opened popup_animation" : "popup"}
      >
        <div className="popup__container popup__container_infoTooltip">
        <img
          className="popup__image_infoTooltip"
          src={props.goodOrBad? imageGood : imageBad}
        />
        {props.goodOrBad? <p className="popup__text_infotooltip">Вы успешно <br/>зарегистрировались!</p> : <p className="popup__text_infotooltip">Что-то пошло не так! <br/>Попробуйте еще раз.</p>}
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