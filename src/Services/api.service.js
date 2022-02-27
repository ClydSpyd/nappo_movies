import axios from 'axios'

export const getFromApi = async (query, page = 1 ) => {
  
  const url = `http://www.omdbapi.com/?apikey=9d4b151c&${query}`
  console.log(url)

  try {

    const { data } = await axios.get( url )
    console.log(data)
    return data;
    
  } catch (error) {

    console.log(error)
    return { error: error.message }

  }
}
