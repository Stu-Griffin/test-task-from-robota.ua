import axios from "axios"
import { URL } from "../index";
import { getVacanciesList } from "../reducer/reducer";
export const getInfFromAPI = () => {
    return function(dispatch) {
        axios.get(URL).then((response) => {
            dispatch(getVacanciesList(response.data))
        })
    }
}