import alt from '../alt'
import Actions from '../actions'

const axios = require('axios')

const allUsersUrl = 'http://localhost:4000/getAllUsers'
const userUrl = 'http://localhost:4000/getUser'
const editUserUrl = 'http://localhost:4000/editUser/'
const resetUsersUrl = 'http://localhost:4000/resetUsers'
const loginUserUrl = 'http://localhost:4000/loginUser'
const resetUserReviewUrl = 'http://localhost:4000/resetUserReview'

class UserStore {
  constructor() {
    this.users = []
    this.user = {}
    this.loggedInUser = null
    this.bindListeners({
      handleGetAllUsers: Actions.GET_ALL_USERS,
      handleGetUser: Actions.GET_USER,
      handleEditUser: Actions.EDIT_USER,
      handleResetUsers: Actions.RESET_USER_TABLE,
      handleLoginUser: Actions.LOGIN_USER,
      handleGetLoggedInUser: Actions.GET_LOGGED_IN_USER,
      handleResetUserReview: Actions.RESET_USER_REVIEW_TABLE
    })
  }

  handleGetAllUsers = garbage => {
    console.log(`UserStore :: handle get all users w/ ${garbage}`)
    fetch(`${allUsersUrl}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ users: json })
      })
  }

  handleGetUser = id => {
    console.log(`UserStore :: handle get user w/ user_id ${id}`)
    fetch(`${userUrl}/${id}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ user: json[0] })
      })
  }

  handleEditUser = user => {
    console.log(`UserStore :: handle edit user w/ user_id ${user.user_id}`)

    console.log(user)
    axios.put(`${editUserUrl}:userid/:username:/:firstname/:lastname/:email/:password/:gender/:hexcolor`, {
      userid: user.user_id,
      username: user.username,
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      hexcolor: user.hex_color
    }).then(() => {
      this.handleGetAllUsers("")
      this.handleGetUser(user.user_id)
    }).catch(err => {
      console.log(err)
    })
  }

  handleResetUsers = () => {
    console.log(`UserStore :: handle reset user table w/ garbage `)
    fetch(resetUsersUrl)
    this.handleGetAllUsers("");
  }

  handleLoginUser = loginInfo => {
    console.log(`UserStore :: handle login user w/ login info ${JSON.stringify(loginInfo)}`)
    const { username, password } = loginInfo

    fetch(`${loginUserUrl}/${username}/${password}`)
      .then(res => res.json())
      .then(json => {
        const loginResult = json.length === 1 ? json[0] : null
        return this.setState({ loggedInUser: loginResult })
      })
  }

  handleGetLoggedInUser = () => {
    console.log(`UserStore :: handle get logged in user w/ garbage`)
    console.log(JSON.stringify(this.loggedInUser))
  }

  handleResetUserReview = garbage => {
    console.log('UserStore :: handle reset user_review table')
    fetch(resetUserReviewUrl)
  }
}

export default UserStore = alt.createStore(UserStore, 'UserStore')
window.UserStore = UserStore
