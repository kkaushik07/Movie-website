
//tmdb

const API_KEY='api_key=4e44d9029b1270a757cddc766a1bcb63'
const BASE_URL ='https://api.themoviedb.org/3'
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`
export const fetchData = async() => {
 try {
     const response = await fetch(API_URL)
    const data = await response.json()
     return data
 } catch(e){
     console.log(e)
 }
}