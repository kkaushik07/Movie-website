import react, { useState } from 'react'
import ReactHlsPlayer from 'react-hls-player';


const MovieDetails = (props) => {

    const [play, setPlay] = useState(false)
    const movie = props.movie
    const date = movie.release_date

    const release_date = date.split('-').reverse().join('/')
    console.log(release_date)
    return (<div className='container jumbotron'
        style={{ backgroundImage: `url(${`http://image.tmdb.org/t/p/original${movie.backdrop_path}`})`, backgroundSize: 'cover', marginTop: 10 }}>
        <div onClick={props.handleMovieDetailClick} style={{ cursor: 'pointer' }} ><img style={{ width: 40, height: 40 }}
            src="https://img.icons8.com/ios-glyphs/90/000000/left.png" />
            <span style={{ marginLeft: 10, color: 'black' }}>Go back</span> </div>
        <div >
            <div className='d-flex flex-direction-column details'>
                <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' style={{ width: 300, height: 400, opacity: 1, marginRight: 20 }} />

                <div >
                    <div className='text'><h1>{movie.original_title}</h1></div>
                    <div className='text'><p>{release_date}</p>  |  <p> Language : {movie.original_language}</p></div>
                    <div className='text'><p> User Score : {(movie.vote_average) * 10}%  </p>
                        |  <p> Total Votes : {movie.vote_count}</p>
                        |  <p onClick={() => { setPlay(!play) }} style={{ cursor: 'pointer' }}  >
                            <img src="https://img.icons8.com/ios-glyphs/90/000000/circled-play.png" style={{ width: 20, height: 20 }} /> Preview </p></div>
                    {play && <div>  <ReactHlsPlayer
                        src="https://content.jwplatform.com/manifests/yp34SRmf.m3u8"
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        height="auto"
                    />

                    </div>}
                    <div className='text'><h3>OverView</h3>
                        <span className='text'>{movie.overview}</span></div>
                </div>
            </div>
        </div>

    </div>




    )

}

export default MovieDetails

