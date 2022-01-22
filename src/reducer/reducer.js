import defaultStore from "../store/store"

export const GETINFFROMAPI = "getInfFromAPI";
export const SETVACANCIESLISTSTATUSARR = "setVacanciesListStatusArr";
export const DeleteObj = "delete";
export const AddObj = "add";
export const REFRESHARRAY = "refreshArray";

const reducer = (state = defaultStore, action) => {
    switch(action.type){
        case GETINFFROMAPI:
            return {
                ...state, 
                vacanciesListArr: [...state.vacanciesListArr, ...action.inf]
            }
        case SETVACANCIESLISTSTATUSARR:
            return {
                ...state, 
                vacanciesListStatusArr: [...state.vacanciesListStatusArr, action.inf]
            }
        case DeleteObj: 
            return {
                ...state,
                vacanciesListStatusArr: state.vacanciesListStatusArr.filter((status) => status.id !== action.inf)
            }
        case AddObj:
            return {
                ...state, 
                vacanciesListStatusArr: [...state.vacanciesListStatusArr, action.inf]
            }
        case REFRESHARRAY:
            return {
                ...state,
                vacanciesListStatusArr: action.inf
            }
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
export const Delete = (id) => ({ 
    type: DeleteObj,
    inf: id
})
export const addObj = (el) => ({ 
    type: AddObj,
    inf: el
})
export const refreshArray = () => ({ 
    type: REFRESHARRAY,
    inf: []
})