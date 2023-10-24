export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const cardLikeButtonClassName = `element__like_button ${
    props.isLiked && "element__like_button_active"
  }`;
  return (
    <li className="element">
      {props.isOwn && (
        <button className="element__delite" onClick={handleDeleteClick} />
      )}
      <img
        className="element__image"
        src={props.card.link}
        onClick={handleClick}
        alt={props.card.name}
      />
      <div className="element__name">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like_count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
