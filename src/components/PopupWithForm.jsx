export default function PopupWithForm(props) {
    return (
        <div id={`${props.name}-form`} className={props.isOpen ? 'popup popup_opened' : 'popup'}>
            <div className="popup__container">
                <form id={`${props.name}-form`} className="popup__form" name="form-redact-profile" noValidate>
                    <h2 className="popup__title">{`${props.title}`}</h2>
                    <div>{props.children}</div>
                    <button type="submit" className="popup__submit popup__button-save">Сохранить</button>
                </form>
                <button type="button" id="close-popup" className="popup__close-button" onClick={props.closeAllPopups}></button>
            </div>
        </div>
    );
};