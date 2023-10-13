import apiRes from '../utils/Api.js';
import Cards from './Cards.jsx'
import React from 'react'; 
export default function Main(props) {
    const [userName, setuserName] = React.useState('');
    const [userDescription, setuserDescription] = React.useState('');
    const [userAvatar, setuserAvatar] = React.useState('');
    const [cards, setcard] = React.useState([]);
    React.useEffect(() => {
       apiRes.getMethodUser()
       .then((res) => {
            setuserName(res.name);
            setuserDescription(res.about);
            setuserAvatar(res.avatar)
        })
        apiRes.getMethodCards()
        .then((res) => {
            setcard(res);
        })
    }, [])

    React.useEffect(() => {
         apiRes.getMethodCards()
         .then((res) => {
             setcard(res);
         })
     },[])
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__information">
                    <button type="button" id="open-avatar-popup" className="profile__avatar" onClick={props.onEditAvatar}>
                        <img className="profile__img"  src={userAvatar} alt="аватарка" />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" id="open-popup" className="profile__edit-button" onClick={props.onEditProfile}></button>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                </div>
                <button type="button" id="open-popup-add-button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>  
            <section className="elements">
                <ul className="elements__list">
                    {
                        
                        cards.map((item) => {return <Card card = {item} onCardClick = {props.onCardClick}/>})
                    }
                </ul>                
            </section>
        </main>
    );
}