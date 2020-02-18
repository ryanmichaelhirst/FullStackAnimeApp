import alt from '../alt'
import Actions from '../actions'

const genreUrl = 'http://localhost:4000/allGenres'
const largestAnimeUrl = 'http://localhost:4000/largestAnimeId'

class GenreStore {
  constructor() {
    this.genres = []

    this.bindListeners({
      handleAllGenres: Actions.GET_ALL_GENRES,
      handleGetLargestAnimeId: Actions.GET_LARGEST_ANIME_ID
    })
  }

  handleAllGenres = garbage => {
    console.log(`GenreStore :: handle get all genres w/ ${garbage}`)
    fetch(`${genreUrl}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ genres: json })
      })
  }

  handleGetLargestAnimeId = garbage => {
    console.log(`GenreStore :: handle get largest anime id w/ ${garbage}`)

    fetch(`${largestAnimeUrl}`)
      .then(res => res.json())
      .then(json => {
        const largestId = json[0]['MAX(anime_id)']

        return this.setState({ largestAnimeId: largestId })
      })
  }
}

export default GenreStore = alt.createStore(GenreStore, 'GenreStore')
window.GenreStore = GenreStore
