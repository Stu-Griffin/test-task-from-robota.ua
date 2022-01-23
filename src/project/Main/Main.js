import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfFromAPI } from "../../workWithAPI/workWithAPI"
import { getVacanciesListStatus, refreshArray } from '../../reducer/reducer';
import Card from "./Card/Card"
import './Main.css';
const dates = ["2022-01-23T08:23:31+0300", "2022-01-11T10:56:14+0300", "2022-01-23T11:00:56+0300", "2022-01-22T00:33:59+0300", "2022-01-19T09:20:39+0300", "2022-01-22T00:43:10+0300", "2022-01-23T11:04:34+0300", "2022-01-08T12:15:59+0300", "2022-01-11T15:59:04+0300", "2022-01-14T16:07:12+0300"]
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
            JSON.parse(localStorage.getItem("vacanciesStatusAndURL")).map(statusObj => {
                dispatch(getVacanciesListStatus(statusObj))
            })
        }
    }, [vacancies])
    return (
        <main className="mainInAPP">
            {vacancies.map((vacancy, i) => {
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
                        time={dates[i]}
                    />
                )
            })}
        </main>
    );
}

export default Main;