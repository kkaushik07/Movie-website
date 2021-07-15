import { combineReducers } from "redux";


const data = (state={},{type, data}) =>{
    switch (type){
        case 'RECIEVE_API_DATA':
            console.log('123')
            return data;
        default:
            return state
    }
}

export default combineReducers({
    data
})