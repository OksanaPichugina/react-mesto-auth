import PopupWithForm from "./PopupWithForm.jsx";
import {CurrentUserContext} from '../contexts/CurrentUserContext.jsx';
import React from "react";
export default function EditAvatarPopup(props){
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef();
    React.useEffect(() => {
        avatarRef.current.value = currentUser.avatar
      }, [currentUser]); 
      function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(avatarRef.current.value);
      } 
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            name={"avatar"}
            title={"Обновить аватар"}
            
          >
            <input
            ref={avatarRef}
              name="avatar"
              id="avatar-input"
              type="url"
              className="popup__input"
              placeholder="Ссылка"
              minLength="2"
              required
            />
            <span className="popup__input-error avatar-input-error "></span>
          </PopupWithForm>
    )
}