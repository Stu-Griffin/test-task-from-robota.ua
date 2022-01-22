import React from "react";
import { useSelector } from 'react-redux';
import "./Card.css";
import FooterInCard from "./FooterInCard/FooterInCard";
import Benefits from "./Benefits/Benefits";
import MainInCard from "./MainInCard/MainInCard";
import { isnotInterestForMe, responseOnVacancy } from "../../App";
function Card(props) {
    const cardStatus = useSelector((state) => (state.vacanciesListStatusArr).find(el => el.id === props.id));
    return (
        <div key={props.id} className={(cardStatus === null || cardStatus === undefined) ? "card" : (cardStatus.status === responseOnVacancy || cardStatus.status === isnotInterestForMe) ? "cardDislikedOrResponed" : "card"}>
            <MainInCard 
                id={props.id}
                name={props.name}
                companyName={props.companyName}
                city={props.city}
                logosSRC={props.logosSRC}
            />
            <Benefits/>
            <FooterInCard
                time={props.time}
                id={props.id}
            />
            <p className={"hidden"}>Ёлки-палки, этот файл просто огромный и не помещается в наш сервер</p>
        </div>
    );
}
export default Card;