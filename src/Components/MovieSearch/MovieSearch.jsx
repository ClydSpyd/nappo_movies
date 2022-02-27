import React from 'react';
import { useState } from 'react';
import { getFromApi } from 'Services/api.service';
import MovieResultBlock from './MovieResultBlock/MovieResultsBlock';

import styles from './MovieSearch.module.scss';

const MovieSearch = () => {

  const [ textInput, setTextInput ] = useState("")
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ currentPage, setPage ] = useState(1)
  const [ movies, setMovies ] = useState(null)

  const callApi = async (query, page) => await getFromApi(`s={${query}}&page=${page}`)

  const handleSearch = async e => {
    e.preventDefault()
    if(textInput=="")return
    setPage(1)
    const { Search, Error, totalResults } = await callApi(textInput, 1)
    setMovies(Error || {items: Search, totalResults})
    setSearchTerm(textInput)
    setTextInput("")
  }

  const handleLoadMore = async (query, page) => {
    setPage(page)
    const res = await callApi(query, page);
    setMovies({...movies, items:[...movies.items, ...res.Search]})
  }

  return (
    <div className={styles.container}>

      <form onSubmit={e=>handleSearch(e)} className={`${styles.inputDiv}`}>
        <div className={styles.lupa} />
        {textInput != "" && <div onClick={() => setTextInput("")} className={styles.clear} />}
        <input
          onChange={e => setTextInput(e.target.value)}
          autoFocus
          value={textInput}
          className='noFocus'
          placeholder={`Search movies`}
          type="text" />
      </form>

      { movies?.items?.length && <h5 className={`${styles.searchTerm}`}>Search results for <span>"{searchTerm}"</span></h5>}

      <div className={`${styles.movieList}`}>
        {

          !movies ? //initial UI state
            <h6>Enter your text above. You can search by movie title, actor, director or year</h6>

          : 
            
            movies == "Movie not found!" ? //empty response 
               <h6>No movies matching your search criteria!</h6>
          
          :

            movies.items?.map((item, idx) => //response containing movies
              <MovieResultBlock item={item} idx={idx} />
            )
          }
      </div>
      {
        movies?.totalResults/10 > currentPage &&
          <div onClick={()=>handleLoadMore(searchTerm, currentPage+1)} className={`${styles.loadMoreBtn}`}>
            Load more
          </div>
      }
    </div>
  )

}

export default MovieSearch;