import React from "react";
import "./FooterInCard.css";
import star from "../../../img/star.svg";
import dislike from "../../../img/dislike.svg";
import starChosen from "../../../img/starChosen.svg";
import dislikeChosen from "../../../img/dislikeChosen.svg";
function FooterInCard(props) {
    return (
        <footer className="footerInCard">
            <div className="additionalFunctionsForCard">
                <button className="joinWork">Откликнуться</button>
                <img className="icon" src={star} alt="save it for me"/>
                <img className="icon" src={dislike} alt="dislike"/>
            </div>
            <p className="time">{(Date.now(props.time))} мин назад</p>
        </footer>
    );
}
export default FooterInCard;