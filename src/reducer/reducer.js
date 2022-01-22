import defaultStore from "../store/store"




export const GETINFFROMAPI = "getInfFromAPI";
export const SETVACANCIESLISTSTATUSARR = "ssetVacanciesListStatusArr";

const reducer = (state = defaultStore, action) => {
    switch(action.type){
        case GETINFFROMAPI:
            return {...state, vacanciesListArr: [...state.vacanciesListArr, ...action.inf]}
        case SETVACANCIESLISTSTATUSARR:
            return {...state, vacanciesListStatusArr: [...state.vacanciesListStatusArr, action.inf]}
        default:
            return state
    }
}
export default reducer;

export const getVacanciesList = (response) => ({ 
    type: GETINFFROMAPI,
    inf: response
})
export const getVacanciesListStatus = (el) => ({ 
    type: SETVACANCIESLISTSTATUSARR,
    inf: el
})