import apiRes from "../utils/Api.js";
import Card from "./Card.jsx";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import { CardContext } from "../contexts/CardContext.jsx";
import Header from "./Header.jsx";
export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardContext);

  return (
    <>
      <Header text="" email=''/>
      <main className="content">
        <section className="profile">
          <div className="profile__information">
            <button
              type="button"
              id="open-avatar-popup"
              className="profile__avatar"
              onClick={props.onEditAvatar}
            >
              <img
                className="profile__img"
                src={currentUser.avatar}
                alt="аватарка"
              />
            </button>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                id="open-popup"
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
              <p className="profile__job">{currentUser.about}</p>
            </div>
          </div>
          <button
            type="button"
            id="open-popup-add-button"
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((item) => {
              const isOwn = item.owner._id === currentUser._id;
              const isLiked = item.likes.some((i) => i._id === currentUser._id);
              return (
                <Card
                  key={`${item._id}`}
                  card={item}
                  onCardClick={props.onCardClick}
                  isOwn={isOwn}
                  onCardLike={props.onCardLike}
                  isLiked={isLiked}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
