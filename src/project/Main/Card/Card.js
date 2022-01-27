import React from "react";
import { useSelector } from 'react-redux';
import "./Card.css";
import FooterInCard from "./FooterInCard/FooterInCard";
import Benefits from "./Benefits/Benefits";
import MainInCard from "./MainInCard/MainInCard";
import { isnotInterestForMe, responseOnVacancy, errorInUploadingFileSize, errorInUploadingFileType, allowedFileTypes } from "../../App";
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
                salary={props.salary}
                salaryCurrency={props.salaryCurrency}
            />
            <Benefits/>
            <FooterInCard
                time={props.time}
                id={props.id}
            />
            <p className={(cardStatus === null || cardStatus === undefined) ? "hidden" : (cardStatus.status === errorInUploadingFileSize || cardStatus.status === errorInUploadingFileType) ? "error" : "hidden"}>Ёлки-палки, этот файл {(cardStatus === null || cardStatus === undefined) ? "" : (cardStatus.status === errorInUploadingFileSize) ? "просто огромный и не помещается в наш сервер" : `не того типа, можно только: ${allowedFileTypes}` }</p>
        </div>
    );
}
export default Card;