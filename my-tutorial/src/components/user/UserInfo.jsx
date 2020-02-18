import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Actions from '../../actions'
import UserEditable from "./UserEditable";
import UserUneditable from "./UserUneditable";

export default class UserInfo extends Component {
  state = {
    user: {},
    userDefault: {},
    isEditing: false
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id)
    const filtered = this.props.users.filter(u => u.user_id === id)
    const userDefault = JSON.parse(JSON.stringify(filtered[0]))

    this.setState({ user: filtered[0], userDefault })
  }

  onCancel = () => {
    const copyInfo = JSON.parse(JSON.stringify(this.state.userDefault))
    this.setState({ isEditing: false, user: copyInfo })
  }

  onEdit = () => {
    this.setState({ isEditing: true })
  }

  onSave = () => {
    Actions.editUser(this.state.user)
  }
  
  onInputChange = event => {
    const { id, value } = event.target
    const { user } = this.state
    
    user[id] = value

    this.setState({ user })
  }

  render() {
    const { isEditing, user } = this.state 

    return (
      <div className="centered-row">
        <Link to="/user">
          <div className="back-button">
            <i className="fa fa-arrow-left" style={{ marginLeft: 5, marginRight: 10 }} />
            Back
          </div>
        </Link>
        
        <div className="left-aligned inline-block user-info-container">
          <div className="user-info-header">
            <span>User Profile</span>
            <button 
              className="user-button"
              onClick={isEditing ? this.onCancel : this.onEdit}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing ? <button className="user-button save-button" onClick={this.onSave}>Save</button> : null}
          </div>

          <div className="centered-row">
            <img src={user.avatar_image} alt={`user-avatar-${user.avatar_image}`} />
          </div>

          <div className="user-info-details">
            {isEditing ? <UserEditable user={user} onInputChange={this.onInputChange} /> : <UserUneditable user={user} />}
          </div>
        </div>
      </div>
    )
  }
}