export default function ImagePopup(props) {
    
    return (
        <div id="image-popup" className={props.card ? 'popup popup_opened popup_class_image' : 'popup'} >
            <div className="popup__container popup__container_image">
                <img className="popup__image" src={props.card ? `${props.card.link}` : ''} alt={props.card ? props.card.name : ''}/>
                <p className = 'popup__text'>{props.card ? props.card.name : ''}</p>
                <button type="button" id="close-popup-image" onClick={props.closeAllPopups} className="popup__close-button"></button>
            </div>
        </div>
    );
};