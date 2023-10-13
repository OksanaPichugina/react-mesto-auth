import apiRes from '../utils/Api.js';
import Card from './Card.jsx'
import React from 'react'; 
export default function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCard] = React.useState([]);
    React.useEffect(() => {
       apiRes.getMethodUser()
       .then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar)
        })
        .catch((err) => { 
            //попадаем сюда если один из промисов завершатся ошибкой 
            console.log(err); 
          })
        
    }, [])

    React.useEffect(() => {
         apiRes.getMethodCards()
         .then((res) => {
             setCard(res);
         })
         .catch((err) => { 
            //попадаем сюда если один из промисов завершатся ошибкой 
            console.log(err); 
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
                        
                        cards.map((item) => { return <Card key={`${item._id}`} card = {item} onCardClick = {props.onCardClick}/>})
                    }
                </ul>                
            </section>
        </main>
    );
}