import React, { useState } from 'react';
import { connect } from 'react-redux';

const MovieList = (props) => {

	
	const FavouriteComponent = props.favouriteComponent;
	const DetailComponent = props.detailComponent

	return (props.movies === undefined ? <h5>loading </h5>:
		<>
			{props.movies.map((movie, index) => (
				<div key={movie.id} className='image-container  d-flex justify-content-start m-3'>
					<img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
					<div
						onClick={() => props.handleMovieDetailClick(movie.id)}
						className='overlay2 d-flex align-items-center justify-content-center'
					>
						<DetailComponent />

					</div>
				</div>
			))}
		</>
	);
};

// const mapStateToProps = state =>{
// 	console.log(state)
// 	return { movies: state.data}
// }

export default  MovieList;
