import React, { Component, Fragment } from 'react'
import Actions from '../../actions'
import UserStore from '../../stores/UserStore'
import history from '../../history'

export default class Login extends Component {
  state = {
    loggedInUser: null,
    loginInfo: {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    UserStore.listen(this.onChange)
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange)
  }

  // browserHistory.push({pathname: '/pathname', state: {message: "hello, im a passed message!"}});
  onChange = store => {
    const { loggedInUser } = store
    if (loggedInUser)
      history.push({ pathname: '/home', state: loggedInUser })
    
    this.setState({ loggedInUser })
  }

  onInputChange = event => {
    const { value, id } = event.target
    const { loginInfo } = this.state
    loginInfo[id] = value
    this.setState({ loginInfo })
  }

  onLogin = () => {
    const { username, password } = this.state.loginInfo
    Actions.loginUser({ username, password })
  }
  
  render() {
    if (this.state.loggedInUser)
      return <Fragment>{this.props.children}</Fragment>
    
    return (
      <div className="centered-row" style={{ marginTop: '10%' }}>
        <div className="login-box">
          <div className="login-tab" />
          <div className="login-title">LOGIN</div>
          <div className="login-form">  
            <div style={{ padding: 20, marginBottom: 20, paddingTop: 15 }}>
              <p className="login-label">Username</p>
              <input className="login-input" onChange={this.onInputChange} id="username" />
              <br />
              <p className="login-label">Password</p>
              <input className="login-input" onChange={this.onInputChange} id="password" />
            </div>
            <button className="login-button" onClick={this.onLogin} >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}