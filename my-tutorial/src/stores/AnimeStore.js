import alt from '../alt'
import Actions from '../actions'

const axios = require('axios')

const allUrl = 'http://localhost:4000/allAnime'
const singleUrl = 'http://localhost:4000/animeById/'
const deleteUrl = 'http://localhost:4000/deleteAnime/'
const resetUrl = 'http://localhost:4000/resetAnime'
const reviewsUrl = 'http://localhost:4000/reviewsByAnimeId/'
const genresUrl = 'http://localhost:4000/genresByAnimeId/'
const addUrl = 'http://localhost:4000/addAnime/'
const resetAnimeGenreUrl = 'http://localhost:4000/resetAnimeGenre'
const postReviewUrl = 'http://localhost:4000/postReview/'
const resetReviewUrl = 'http://localhost:4000/resetReviews'

class AnimeStore {
  constructor() {
    this.animes = []
    this.anime = {}
    this.reviews = []
    this.genres = []

    this.bindListeners({
      handleGetAnime: Actions.GET_ANIME,
      handleGetAnimes: Actions.GET_ANIMES,
      handleDeleteAnime: Actions.DELETE_ANIME,
      handleResetAnime: Actions.RESET_ANIME_TABLE,
      handleGetReviews: Actions.GET_REVIEWS,
      handleGetGenres: Actions.GET_GENRES,
      handleAddAnime: Actions.ADD_ANIME,
      handleResetAnimeGenre: Actions.RESET_ANIME_GENRE_TABLE,
      handlePostReview: Actions.POST_REVIEW,
      handleResetReview: Actions.RESET_REVIEW_TABLE
    })
  }

  handleGetAnime = id => {
    console.log(`AnimeStore :: handle get anime on anime_id ${id}`)
    fetch(`${singleUrl}${id}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ anime: json[0] })
      })
  }

  handleGetAnimes = garbage => {
    console.log(`AnimeStore :: handle get animes w/ ${garbage}`)
    fetch(allUrl)
      .then(res => res.json())
      .then(json => {
        return this.setState({ animes: json })
    })
  }

  handleDeleteAnime = id => {
    console.log(`AnimeStore :: handle delete called on anime_id ${id}`)
    fetch(`${deleteUrl}${id}`).then(() => {
      this.handleGetAnimes("")
    })
  }

  handleResetAnime = garbage => {
    console.log(`AnimeStore :: handle reset anime table w/ ${garbage}`)
    fetch(resetUrl).then(() => {
      this.handleGetAnimes("")
    })
  }

  handleGetReviews = id => {
    console.log(`AnimeStore :: handle get reviews w/ anime_id ${id}`)
    fetch(`${reviewsUrl}${id}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ reviews: json })
      })
  }

  handleGetGenres = id => {
    console.log(`AnimeStore :: handle get genres w/ anime_id ${id}`)
    fetch(`${genresUrl}${id}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ genres: json })
      })
  }

  handleAddAnime = anime => {
    console.log(`AnimeStore :: handle add anime w/ anime ${anime}`)

    // FIX!!! genres: anime.genre
    axios.post(`${addUrl}:name/:animeId/:type/:episodes/:rating/:members/:genres`, {
      name: anime.name,
      animeId: anime.animeId,
      type: anime.type,
      episodes: anime.episodes,
      rating: anime.rating,
      members: anime.members,
      genres: anime.genres
    }).then(() => {
      this.handleGetAnimes("")
    }).catch(err => {
      console.log('handleAddAnime error!')
      console.log(err)
    })
  }

  handleResetAnimeGenre = garbage => {
    console.log(`AnimeStore :: handle reset anime_genres table w/ ${garbage}`)
    fetch(`${resetAnimeGenreUrl}`)
  }

  handlePostReview = reviewInfo => {
    console.log(`UserStore :: handle post review w/ review info ${JSON.stringify(reviewInfo)}`)
    const { review, anime_id, user_id, date_time } = reviewInfo
    axios.post(`${postReviewUrl}:review/:animeId/:userId/:dateTime`, {
      review,
      animeId: anime_id,
      userId: user_id,
      dateTime: date_time
    }).then(() => {
      this.handleGetReviews(anime_id)
    }).catch(err => {
      console.log('handlePostReview error!')
      console.log(err)
    })
  }

  handleResetReview = garbage => {
    console.log(`AnimeStore :: handle reset reviews table w/ ${garbage}`)
    fetch(resetReviewUrl)
  }
}

export default AnimeStore = alt.createStore(AnimeStore, 'AnimeStore')
window.AnimeStore = AnimeStore;
