import '../index.css';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Main from './Main.jsx'
import PopupWithForm from './PopupWithForm.jsx'
import ImagePopup from './ImagePopup.jsx'
import React from 'react'; 
function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setselectedCard] = React.useState(null);
    function handleEditAvatarClick(){
        
        setEditAvatarPopupOpen(true);
        
    };
    function handleEditProfileClick () {
       
        setEditProfilePopupOpen(true);
        
    };
    function handleAddPlaceClick( ) {
        
        setAddPlacePopupOpen(true);
        
    };

    function handleCardClick(card){
        
        setselectedCard(card);
        
    };

    function handleCloseBtnClick() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setselectedCard(null)
    }

  return (
    <div className="App">
      <div className="body">
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} /> 
        <Footer />
    </div>
    {/*редактирование профиля*/ }
    <PopupWithForm 
    isOpen={isEditProfilePopupOpen} 
    name = {"edit"} 
    title = {"Редактировать профиль"}
    children = {
        <div className='form_dop'>
            <input name="name" id="name-input" type="text" className="popup__input" placeholder="Имя" minLength="2" maxLength="40" required/>
            <span className="popup__input-error name-input-error "></span>
            <input name="job" id="job-input" type="text" className="popup__input" placeholder="Профессия" minLength="2" maxLength="200" required/>
            <span className="popup__input-error job-input-error "></span>
        </div>
    }
    closeAllPopups={handleCloseBtnClick}
    />
    {/*редактирование аватара*/ }
    <PopupWithForm 
    isOpen={isEditAvatarPopupOpen} 
    name = {"avatar"} 
    title = {"Обновить аватар"}
    children = {
        <div className='form_dop'>
            <input name="avatar" id="avatar-input" type="url" className="popup__input" placeholder="Ссылка" minLength="2" required />
            <span className="popup__input-error avatar-input-error "></span>
        </div>
    }
    closeAllPopups={handleCloseBtnClick}
    />
    {/*Добавление новой карточки*/ }
    <PopupWithForm 
    isOpen={isAddPlacePopupOpen} 
    name = {"add"} 
    title = {"Новое место"} 
    children = {
        <div className='form_dop'>
            <input name="place" id="place-input" type="text" className="popup__input" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__input-error place-input-error "></span>
            <input name="link" id="link-input" type="url" className="popup__input" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error link-input-error "></span>
        </div>
    }
    closeAllPopups={handleCloseBtnClick}
    />

    <ImagePopup 
    card = {selectedCard}
    closeAllPopups={handleCloseBtnClick}
    />
    </div>
    </div>
  );
}

export default App;
