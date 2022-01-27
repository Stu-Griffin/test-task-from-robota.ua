import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./FooterInCard.css";
import star from "../../../img/star.svg";
import dislike from "../../../img/dislike.svg";
import starChosen from "../../../img/starChosen.svg";
import dislikeChosen from "../../../img/dislikeChosen.svg";
import { deleteObj, addObj, openOrCloseModal, exportUrl } from "../../../../reducer/reducer";
import { store } from "../../../..";
import { savedForMeStatus, isnotInterestForMe, responseOnVacancy, errorInUploadingFileSize, defaultstatus, errorInUploadingFileType, allowedFileTypes } from "../../../App";
import { Widget } from "@uploadcare/react-widget";

const UPLOADCARE_LOCALE_TRANSLATIONS = {
    uploading: 'Загружаеться Подождите...',
    loadingInfo: 'Загружаем инф...',
    errors: {
        default: 'Ошибка',
        baddata: 'Некоректное значение',
        size: 'Файл слишком большой',
        upload: 'Не могу загрузить',
        user: 'Загрузка отменена',
        info: 'Не могу загрузить инф',
        image: 'Можете загрузить, только картинки',
        createGroup: 'Не могу создать группу файлов',
        deleted: 'Файл был удален'
    },
    draghere: 'Положите файл сюда',
    file: {
        one: '%1 файлов',
        other: '%1 файлов'
    },
    buttons: {
        cancel: 'Отменить',
        remove: 'Убрать',
        choose: {
            files: {
                one: 'Откликнуться',
                other: 'Откликнуться'
            },
            images: {
                one: 'Откликнуться',
                other: 'Откликнуться'
            }
        }
    },
    dialog: {
        close: 'Закрыть',
        openMenu: 'открыть меню',
        done: 'Готово',
        showFiles: 'Показать файлы',
        tabs: {
            preview: {
                error: {
                    default: {
                        title: 'Ёлки-палки!',
                        text: 'Этот файл просто огромный и не помещается в наш сервер или не того формата',
                        back: 'Следующий дубль)'
                    },
                    size: {
                        title: 'Файл слишком большой',
                        text: 'Попытай удачу с другим файлом'
                    },
                    type: {
                        title: 'Файл слишком большой',
                        text: 'Попытай удачу с другим файлом'
                    }
                },
            }
        },
    }
};

function FooterInCard(props) {
    const dispatch = useDispatch();
    const vacancySatus = useSelector((state) => state.vacanciesListStatusArr.find(el => el.id === props.id));
    const modalStatus = useSelector((state) => state.modalStatus);

    const iconAction = (type) => { 
        const obj = Object.assign({}, vacancySatus)
        if(vacancySatus.status === responseOnVacancy) {
            alert("Вы не можете отменить отправку заявки")
        } else if(type === vacancySatus.status) {
            obj.status = defaultstatus  
        } else {
            obj.status = type
        }
        dispatch(deleteObj(props.id))
        dispatch(addObj(obj))
        const newArrVacancySatus = (store.getState()).vacanciesListStatusArr;
        localStorage.setItem('vacanciesStatusAndURL', JSON.stringify(newArrVacancySatus));
        if(type === responseOnVacancy) {
            dispatch(openOrCloseModal(modalStatus))
        }
    }

    const changeCardStatusError = (errorType) => {
        const obj = Object.assign({}, vacancySatus)
        obj.status = errorType 
        dispatch(deleteObj(props.id))
        dispatch(addObj(obj))
    }

    const fileSizeLimit = (size) => {
        return function(fileInfo) {
            if (fileInfo.size === null) {
                return
            }
            if (fileInfo.size > size) {
                changeCardStatusError(errorInUploadingFileSize)
                throw new Error('fileType') 
            }
        }
    }

    const fileTypeLimit = (allowedFileTypes) => {
        const types = allowedFileTypes.split(' ')
        return function(fileInfo) {
            if (fileInfo.name === null) {
                return
            }
            const extension = fileInfo.name.split('.').pop()
            if (extension && !types.includes(extension)) {
                changeCardStatusError(errorInUploadingFileType)
                throw new Error('fileType')
            }
        }
    }  

    const getTime = (time) => {
        const d1 = Date.now(), d2 = Date.parse(props.time), interval = new Date(d1 - d2);
        // год.месяц.день.час.минута.секунда
        const years = `${interval.getFullYear() - 1970} лет`
        const months = `${interval.getMonth()} месяцев`
        const days = `${interval.getDate() - 1} дней`
        const hours = `${interval.getHours()} часов`
        const minutes = `${interval.getMinutes()} минут`
        const seconds = `${interval.getSeconds()} секунд`
        let result = [years, months, days, hours, minutes, seconds].filter((el) => !(el.split("").includes("0"))).join(" ");
        return result
    }

    const validators = [fileSizeLimit(2 * 1024 * 1024), fileTypeLimit(allowedFileTypes)]; // 2Mb
    
    return ( 
        <footer className="footerInCard">
            <div className="additionalFunctionsForCard">
                <p className={(vacancySatus === null || vacancySatus === undefined) ? "active" : (vacancySatus.status === responseOnVacancy) ? "hidden" : "active"}>
                    <Widget
                        localeTranslations={UPLOADCARE_LOCALE_TRANSLATIONS}
                        className={(vacancySatus === null || vacancySatus === undefined) ? "joinWork" : (vacancySatus.status === responseOnVacancy) ? "hidden" : "joinWork"}
                        validators={validators}
                        publicKey='0478a850175828aba9a6'
                        id='file'
                        name='file'
                        tabs='file url'
                        previewStep='true' 
                        onFileSelect={async (file) => {
                            if (file) {
                                await file.done(info => {
                                    dispatch(exportUrl(info.cdnUrl))
                                })
                                iconAction(responseOnVacancy)
                            }
                        }}
                    />
                </p>
                <img className="icon" onClick={() => {
                    iconAction(savedForMeStatus)
                }} src={(vacancySatus === null || vacancySatus === undefined) ? star : (vacancySatus.status === savedForMeStatus) ? starChosen : star} alt="save it for me"/>
                <img className="icon" onClick={() => {
                    iconAction(isnotInterestForMe)
                }} src={(vacancySatus === null || vacancySatus === undefined) ? dislike : (vacancySatus.status === isnotInterestForMe) ? dislikeChosen : dislike} alt="dislike"/>
            </div>
            <p className="time">{getTime(props.time)} назад</p>
        </footer>
    );
}
export default FooterInCard;