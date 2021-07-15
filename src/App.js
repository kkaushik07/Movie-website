import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import { requestApiData } from './store/action'
import MovieDetails from './components/MovieDetails';
import Detail from './components/Details';


const App = (props) => {
	const movies = props.movies.results
	const [favourites, setFavourites] = useState([]);
	const [currentMovie, setCurrentMovie] = useState(null);
	const [showMovie,setShowMovie]=useState(true);
	const [showFavorites, setShowFavorites] = useState(false)


	useEffect(() => {
		props.requestApiData()
		console.log(props.movies)
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);


	const viewMovieInfo = (id) => {

		const filteredMovie = movies.filter(movie => movie.id == id)
		const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
		setCurrentMovie(newCurrentMovie)
	}

	const closeMovieInfo = () => setCurrentMovie(null)

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (!currentMovie ?

		<div className='container-fluid movie-app'>
			<ul class="nav justify-content-start">
  <li class="nav-item nav-link" onClick={()=>{setShowMovie(true);setShowFavorites(false)}}>Movies</li> 
  <li class="nav-item nav-link" onClick={()=>{setShowMovie(false);setShowFavorites(true)}}>
    Favourites
  </li>
  
</ul>
		{showMovie && < div className='row d-flex align-items-center mt-4 mb-4'>
			<MovieListHeading heading='Movies' />
			</div>}
			{showMovie && 	<div id='movies' className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					handleMovieDetailClick={viewMovieInfo}
					favouriteComponent={AddFavourites}
					detailComponent={Detail}
				/>
			</div>}
			{showFavorites &&<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>}
			{showFavorites &&<div id='favorites' className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					handleMovieDetailClick={viewMovieInfo}
					favouriteComponent={RemoveFavourites}
					detailComponent={Detail}
				/>
			</div>}
		</div>
		:
		<div><MovieDetails
			movie={currentMovie}
			handleMovieDetailClick={closeMovieInfo}
		/>
		</div>
	);
};

const mapStateToProps = state => {
	console.log(state)
	return { movies: state.data }
}

export default connect(mapStateToProps, { requestApiData })(App);
