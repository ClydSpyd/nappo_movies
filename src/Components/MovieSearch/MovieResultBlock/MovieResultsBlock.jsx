import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './MovieResultsBlock.module.scss';

const MovieResultsBlock = ({ item : { Poster, Year, Title, imdbID }}) => {
  
  const contRef = useRef()
  const offSet = Math.floor(Math.random()*20) * 10
  useEffect(()=>{
    setTimeout(()=>{contRef.current.classList.add(styles.show)},offSet)
  },[])

  return (
    <Link ref={contRef} to={`/movie/${imdbID}`} className={`${styles.container}`}>
      <img
        src={Poster}
        alt={`${Title} poster`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src="https://media.comicbook.com/files/img/default-movie.png";
        }}
        />
      <h5>{Title} <span>({Year})</span></h5>
    </Link>
  )

}

export default MovieResultsBlock;