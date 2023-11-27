import "../index.css";

import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import React from "react";
import apiRes from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import { CardContext } from "../contexts/CardContext.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import * as auth from "../utils/Auth.jsx";
import { useNavigate } from "react-router-dom";
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setselectedCard] = React.useState(null);
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    avatar: "",
    _id: "",
    about: "",
    email: "",
  });

  const [cards, setCards] = React.useState([]);
  const goodOrBad = false;

  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = ({ password, email }) => {
    return auth.authorize(password, email).then((res) => {
      console.log(res);
      if (res.token) {
        setLoggedIn(true);
        localStorage.setItem("token", res.token);
        setCurrentUser((prevState) => ({
          ...prevState,
          email: email,         
      }));
        navigate("/",{replace: true});
      }
    }) .catch((err) => {
      console.log(err);
    
    })
  };
  
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      
      authFunc(jwt);
    }
    // console.log(loggedIn)
  }, []);

  const authFunc = (token) => {
    return auth.getContent(token).then((res) => {
      if (res) {
        setLoggedIn(true);
         setCurrentUser((prevState) => ({
           ...prevState,
           email: res.data.email,
           _id: res.data._id,
         }));
        navigate('/', {replace: true})
        //console.log(res.data.email)
        //console.log(currentUser);
      }
    }).catch(() => navigate('/sign-in', {replace: true}))
  };

  const handleRegister = ({ password, email }) => {
    return auth
      .register(password, email)
      .then((res) => {
        setInfoTooltipStatus("success");
        navigate("/sign-in", {replace: true})
        return res;
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus("error");
      })
      .finally(() => {
        setTimeout(function () {
          setInfoTooltipStatus("");
        }, 2000);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in",{replace: true});
  };

  React.useEffect(() => {
    if (loggedIn) {
      apiRes
        .getMethodCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          //попадаем сюда если один из промисов завершатся ошибкой
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiRes
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершатся ошибкой
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные
    apiRes
      .deleteMethod(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id != card._id));
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершатся ошибкой
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setselectedCard(card);
  }

  React.useEffect(() => {
    //console.log('!@!@')
    // console.log(loggedIn)
    if (loggedIn) {
      apiRes
        .getMethodUser()
        .then((res) => {
          setCurrentUser((prevState) => ({
            ...prevState,
            name: res.name,
            avatar: res.avatar,
            _id: res._id,
            about: res.about,
          }));
          console.log(currentUser);
        })
        .catch((err) => {
          //попадаем сюда если один из промисов завершатся ошибкой
          console.log(err);
        });
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setselectedCard(null);
    setInfoTooltipStatus("");
  }

  function handleUpdateUser(name, job) {
    apiRes
      .setUserInfo(name, job)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          avatar: res.avatar,
          _id: res._id,
          about: res.about,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершатся ошибкой
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    apiRes
      .patchAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          avatar: res.avatar,
          _id: res._id,
          about: res.about,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершатся ошибкой
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(place, link) {
    apiRes
      .postCard(place, link)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершатся ошибкой
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="App">
          <div className="body">
            <div className="page">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      element={Main}
                      loggedIn={loggedIn}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onSignOut={onSignOut}
                    />
                  }
                />
                <Route
                  path="/sign-in"
                  element={
                    <Login handleLogin={handleLogin} loggedIn={loggedIn} />
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <Register
                      handleRegister={handleRegister}
                      loggedIn={loggedIn}
                    />
                  }
                />
              </Routes>
              <Footer />
            </div>
            {/*редактирование профиля*/}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              closeAllPopups={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            {/*редактирование аватара*/}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              closeAllPopups={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            {/*Добавление новой карточки*/}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              closeAllPopups={closeAllPopups}
              onUpdateCards={handleAddPlaceSubmit}
            />

            <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} />
            <InfoTooltip
              closeAllPopups={closeAllPopups}
              status={infoTooltipStatus}
              goodOrBad={goodOrBad}
            />
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
