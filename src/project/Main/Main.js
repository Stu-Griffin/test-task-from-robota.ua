import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfFromAPI } from "../../workWithAPI/workWithAPI"
import { getVacanciesListStatus } from '../../reducer/reducer';
import Card from "./Card/Card"
import './Main.css';

function Main() {
    const dispatch = useDispatch();
    const vacancies = useSelector((state) => state.vacanciesListArr)
    const vacanciesSatusesAndURL = useSelector((state) => state.vacanciesListStatusArr)
    useEffect(() => {
        dispatch(getInfFromAPI())
    }, [])
    useEffect(() => {
        vacancies.map(el => {
            const obj = {
                id: el.id,
                status: "active",
                employerUrl: el.employerUrl
            }
            dispatch(getVacanciesListStatus(obj))
        })
    }, [vacancies])
    return (
        <main className="mainInAPP">
            <button onClick={() => {
                console.log(vacanciesSatusesAndURL)
            }}>test</button>
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