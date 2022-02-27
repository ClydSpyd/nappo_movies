import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFromApi } from 'Services/api.service';
import { starRating } from 'Utils/starRating';

import styles from './MovieDetails.module.scss';

const MovieDetails = () => {

  const { movie_id } = useParams()
  const [ movieData, setMovieData ] = useState(null)
  const getData = async () => setMovieData(await getFromApi(`i=${movie_id}`))

  const logoClass = input => 
      input == 'Internet Movie Database' ? 'imdb' :
      input == 'Rotten Tomatoes' ? 'rt' : 
      input == 'Metacritic' ? 'meta' : null 
  

  useEffect(()=>{getData()},[])

  return !movieData ? <h6>loading</h6> : (
    <div className={styles.container}>
      <img src={movieData.Poster} alt={`${movieData.Title} poster`} />
      <div className={`${styles.text}`}>
        <h1>{movieData.Title}</h1>
        {starRating(parseInt(movieData.imdbRating))}
        <div className={`${styles.dataRow}`}>
          <h5>Genre:</h5><p>{movieData.Genre}</p>
        </div>
        <div className={`${styles.dataRow}`}>
          <h5>Director:</h5><p>{movieData.Director}</p>
        </div>
        <div className={`${styles.dataRow}`}>
          <h5>Cast:</h5><p>{movieData.Actors}</p>
        </div>
        <p className={`${styles.plot}`}>{movieData.Plot}</p>

        <div className={`${styles.ratings}`}>
          {
            movieData.Ratings[0] &&
              <div className={`${styles.item}`}>
                <div className={`${styles.logo} ${styles[logoClass(movieData.Ratings[0].Source)]}`} />
                <h5>{movieData.Ratings[0].Value}</h5>
              </div>
          }
          {
            movieData.Ratings[1] &&
              <div className={`${styles.item}`}>
                <div className={`${styles.logo} ${styles[logoClass(movieData.Ratings[1].Source)]}`} />
                <h5>{movieData.Ratings[1].Value}</h5>
              </div>
          }
          {
            movieData.Ratings[2] &&
              <div className={`${styles.item}`}>
                <div className={`${styles.logo} ${styles[logoClass(movieData.Ratings[2].Source)]}`} />
                <h5>{movieData.Ratings[2].Value}</h5>
              </div>
          }
        </div>
      </div>
    </div>
  )

}

export default MovieDetails;