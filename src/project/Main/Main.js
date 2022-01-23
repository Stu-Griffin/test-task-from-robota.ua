import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfFromAPI } from "../../workWithAPI/workWithAPI"
import { getVacanciesListStatus, refreshArray } from '../../reducer/reducer';
import Card from "./Card/Card"
import './Main.css';

function Main() {
    const dispatch = useDispatch();
    let vacancies = useSelector((state) => state.vacanciesListArr)
    useEffect(() => {
        dispatch(getInfFromAPI())
    }, [])
    useEffect(() => {
        dispatch(refreshArray())
        if(localStorage.getItem("vacanciesStatusAndURL") === null || localStorage.getItem("vacanciesStatusAndURL") === undefined) {
            vacancies.map(el => {
                const obj = {
                    id: el.id,
                    status: "active",
                    employerUrl: el.employerUrl
                }
                dispatch(getVacanciesListStatus(obj))
            })
        } else {
            console.log("import")
            JSON.parse(localStorage.getItem("vacanciesStatusAndURL")).map(statusObj => {
                dispatch(getVacanciesListStatus(statusObj))
            })
        }
    }, [vacancies])
    return (
        <main className="mainInAPP">
            {vacancies.map(vacancy => {
                return(
                    <Card
                        key = {vacancy.id}
                        name = {vacancy.name}
                        salary = {vacancy.salary}
                        salaryCurrency = {vacancy.salaryCurrency}
                        city = {vacancy.city}
                        logosSRC = {vacancy.logosSRC}
                        companyName = {vacancy.companyName}
                        employerUrl = {vacancy.employerUrl}
                        joinVacancy = {vacancy.joinVacancy}
                        dislikeVacancy = {vacancy.dislikeVacancy}
                        saveInFavorite = {vacancy.saveInFavorite}
                        id = {vacancy.id}
                        time={vacancy.creationDate}
                    />
                )
            })}
        </main>
    );
}

export default Main;