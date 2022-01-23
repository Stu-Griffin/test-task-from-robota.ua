import React from "react";
import { useSelector } from 'react-redux';
import { isnotInterestForMe, responseOnVacancy } from "../../../App";
import "./MainInCard.css";
function MainInCard(props) {
    const cardStatusAndUrl = useSelector((state) => (state.vacanciesListStatusArr).find(el => el.id === props.id));
    return (
        <main className="mainInCard">
            <article> 
                {(cardStatusAndUrl === null || cardStatusAndUrl === undefined) ? <p className="marker">Новая</p> : (cardStatusAndUrl.status === isnotInterestForMe) ? <p className="markerDisliked">Не интересная</p> : (cardStatusAndUrl.status === responseOnVacancy) ? <p className="markerResponded">Вы откликнулись</p> : <p className="marker">Новая</p>}
                <p className="vacancyName">{props.name}</p> 
                <p>{props.salary} {props.salaryCurrency}</p>
                <div className="aboutWorkAndArea">
                    <p className="linkToEmployerSite" onClick={() => {
                        window.open(cardStatusAndUrl.employerUrl)
                    }}>{props.companyName}</p>
                    <p className="city">{props.city}</p>
                </div>
            </article>
            <img src={props.logosSRC} className="companyLogo" alt="logo of the company"/>
        </main>
    );
}
export default MainInCard;