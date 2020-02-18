import React, { Component } from 'react'
import UserList from './UserList'
import AlphabetFilter from '../filters/AlphabetFilter'
import SearchBar from '../filters/SearchBar'
import LoadingBar from '../loader/LoadingBar';

export default class UserContainer extends Component {
  state = {
    users: [],
    users_copy: [],
    currentTotal: 'Loading...',
    loading: true
  }

  componentDidMount() {
    const { users } = this.props
    
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)

    users.sort(this.compareUsernames)
    this.setState({ users, users_copy: users, currentTotal: users.length })
  }

  compareUsernames = (a, b) => {
    const str1 = a.username
    const str2 = b.username

    return str1.localeCompare(str2)
  }

  onFilter = (id, toggledOn) => {
    // filter out the users that match that letter
    const filteredUsers = id === 'ALL' ? this.state.users_copy :
      this.state.users.filter(user => {
        return user.username.charAt(0).toLowerCase() !== id.toLowerCase()
      })

    // filter back the users that match that letter
    if (toggledOn) {
      this.state.users_copy.forEach(user => {
        if (user.username.charAt(0).toLowerCase() === id.toLowerCase()) {
          filteredUsers.push(user)
        }
      })

      filteredUsers.sort(this.compareUsernames)
    }

    const currentTotal = filteredUsers.length

    this.setState({ users: filteredUsers, currentTotal })
  }

  onSearch = event => {
    const { value } = event.target
    const filteredUsers = this.state.users_copy.filter(user => {
      return user.username.includes(value)
    })
    const currentTotal = filteredUsers.length

    this.setState({ users: filteredUsers, currentTotal: currentTotal })
  }

  render() {
    if (this.state.loading) {
      return <LoadingBar />
    }

    return (
      <div>
        <div className="centered-row" style={{ marginTop: 20 }}>
          <SearchBar 
            keyName="Search" 
            placeholder="Enter username..." 
            data={this.state.users} 
            onSearch = {this.onSearch}  
          />
        </div>

        <div style={{ marginBottom: 30, marginTop: 30 }}>
          <AlphabetFilter onFilter={this.onFilter} />
        </div>
        
        <div className="centered-row" style={{ marginBottom: 30 }}>
          <div className="user-list-count">
            Total Users: {this.state.currentTotal}
          </div>
        </div>

        <UserList users={this.state.users} />
      </div>
    )
  }
}