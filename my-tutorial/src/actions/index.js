import alt from '../alt'
import history from '../history'
import toastr from 'toastr'

class Actions {
  getAnime(id) {
    return id
  }

  getAnimes(payload) {
    return payload
  }

  deleteAnime(id) {
    toastr.success(`Deleted anime with id ${id} from Anime table!`)
    return id
  }

  resetAnimeTable(payload) {
    toastr.success(`Reset Anime table!`)
    return payload
  }
  
  getReviews(id) {
    return id
  }

  getGenres(id) {
    return id
  }

  addAnime(anime) {
    const { name, type } = anime
    toastr.success(`Added the ${type.toLowerCase()} ${name} to the Anime table!`)
    history.push('/home')
    return anime
  }

  getAllGenres(payload) {
    return payload
  }

  getLargestAnimeId(payload) {
    return payload
  }

  resetAnimeGenreTable(payload) {
    toastr.success(`Reset Anime_Genre table!`)
    return payload
  }

  getAllUsers(garbage) {
    return garbage
  }

  getUser(id) {
    return id
  }

  editUser(user) {
    const {user_id, username } = user 
    toastr.success(`Updated ${username} with user id ${user_id}!`)
    history.push(`/user`)
    return user
  }
  
  resetUserTable(payload) {
    toastr.success(`Reset Users table!`)
    return payload
  }

  loginUser(payload) {
    return payload
  }

  getLoggedInUser(garbage) {
    return garbage
  }

  postReview(review) {
    return review
  }

  resetReviewTable(payload) {
    toastr.success('Reset Reviews table!')
    return payload
  }

  resetUserReviewTable(payload) {
    toastr.success('Reset User_Review table!')
    return payload
  }
}

export default alt.createActions(Actions)