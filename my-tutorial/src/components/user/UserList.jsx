import React from 'react'
import { Link } from 'react-router-dom'
import AnimeSky from '../../res/imgs/anime-sky.jpeg'

const UserList = ({ users }) => {
  const usersJSX = users.map(user => {
    const { username, avatar_image, first_name, last_name, user_id } = user

    return (
      <Link to={`/userInfo/${user_id}`} key={username}>
        <div className="user-list-card">
          <div style={{ backgroundImage: `url('${AnimeSky}')` }} className="user-list-card-img">
            <img
              className="user-list-avatar-img"
              src={avatar_image} 
              alt={`user-${avatar_image}`} 
            />
          </div>
          
          <div className="user-list-card-info">
            <p>{username}</p>
            <hr style={{ width: 65 }} />
            <span>{last_name}, {first_name}</span>
          </div>
        </div>
      </Link>
    )
  })
  
  return (
    <div className="centered-row">
      {usersJSX}    
    </div>
  )
}

export default UserList