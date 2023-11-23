import imageGood from "../images/UnionGood.svg";
import imageBad from "../images/UnionBad.svg";
export default function InfoTooltip(props) {
  const toolTipText =
    props.status === "success" ? (
      <p className="popup__text_infotooltip">
        Вы успешно <br />
        зарегистрировались!
      </p>
    ) : (
      <p className="popup__text_infotooltip">
        Что-то пошло не так! <br />
        Попробуйте еще раз.
      </p>
    );
  const toolTipImg = props.status === "success" ? imageGood : imageBad;
  return (
    <div
      id="infoTooltip-popup"
      className={
        props.status !== "" ? "popup popup_opened popup_animation" : "popup"
      }
    >
      <div className="popup__container popup__container_infoTooltip">
        <img className="popup__image_infoTooltip" src={toolTipImg} />
        {toolTipText}
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
