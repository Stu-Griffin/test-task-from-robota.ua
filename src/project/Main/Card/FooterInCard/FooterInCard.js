import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./FooterInCard.css";
import star from "../../../img/star.svg";
import dislike from "../../../img/dislike.svg";
import starChosen from "../../../img/starChosen.svg";
import dislikeChosen from "../../../img/dislikeChosen.svg";
import { Delete, addObj } from "../../../../reducer/reducer";
import { store } from "../../../..";
import { savedForMeStatus, isnotInterestForMe, responseOnVacancy } from "../../../App";
function FooterInCard(props) {
    const dispatch = useDispatch();
    const vacancySatus = useSelector((state) => state.vacanciesListStatusArr.find(el => el.id === props.id));
    const iconAction = (id, type) => { 
        const obj = Object.assign({}, vacancySatus)
        console.log(vacancySatus)
        if(vacancySatus.status === responseOnVacancy) {
            alert("Вы не можете отменить отправку заявки")
        } else if(type === vacancySatus.status) {
            obj.status = "active"  
        } else {
            obj.status = type
        }
        dispatch(Delete(id))
        dispatch(addObj(obj))
        const newArrVacancySatus = (store.getState()).vacanciesListStatusArr;
        console.log(newArrVacancySatus)
        localStorage.setItem('vacanciesStatusAndURL', JSON.stringify(newArrVacancySatus));
    }
    return ( 
        <footer className="footerInCard">
            <div className="additionalFunctionsForCard">
                <button className={(vacancySatus === null || vacancySatus === undefined) ? "joinWork" : (vacancySatus.status === responseOnVacancy) ? "hidden" : "joinWork"} onClick={() => {
                    iconAction(props.id, responseOnVacancy)
                }}>Откликнуться</button>
                <img className="icon" onClick={() => {
                    iconAction(props.id, savedForMeStatus)
                }} src={(vacancySatus === null || vacancySatus === undefined) ? star : (vacancySatus.status === savedForMeStatus) ? starChosen : star} alt="save it for me"/>
                <img className="icon" onClick={() => {
                    iconAction(props.id, isnotInterestForMe)
                }} src={(vacancySatus === null || vacancySatus === undefined) ? dislike : (vacancySatus.status === isnotInterestForMe) ? dislikeChosen : dislike} alt="dislike"/>
            </div>
            <p className="time">{(Date.now(props.time))} мин назад</p>
        </footer>
    );
}
export default FooterInCard;