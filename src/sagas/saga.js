import { call, put, takeLatest } from "@redux-saga/core/effects";

import { recieveApiData } from "../store/action";
import { fetchData } from "../api";


function* getApiData (action){
    try{ 
        console.log('saga')
    const data = yield call(fetchData)
    yield put(recieveApiData(data));
} catch(e){
    console.log(e)
} 
}

export default function* watchDataFetch(){
    yield takeLatest('REQUEST_API_DATA', getApiData )
}