import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./MainInCard.css";
function MainInCard(props) {
    const vacanciesSatusesAndURL = useSelector((state) => state.vacanciesListStatusArr)
    return (
        <main className="mainInCard">
            <article>
                <p className="marker">Новая</p>
                <p className="vacancyName" onClick={() => {
                    console.log(vacanciesSatusesAndURL)
                }}>{props.name}</p>
                {}
                <div className="aboutWorkAndArea">
                    <p className="linkToEmployerSite" onClick={() => {
                        const find = vacanciesSatusesAndURL.find(el => (el.id) === (props.id).toString());
                        window.open(find.employerUrl)
                    }}>{props.companyName}</p>
                    <p className="city">{props.city}</p>
                </div>
            </article>
            <img src={props.logosSRC} className="companyLogo" alt="logo of the company"/>
        </main>
    );
}
export default MainInCard;