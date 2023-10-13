export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    } 
    return (
        <div id = "element-template">
        <li className="element">
            <button type="button" className="element__delite"></button>
            <img className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}  />
            <div className="element__name">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" className="element__like_button"></button>
                    <p className="element__like_count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    </div>
    );
};