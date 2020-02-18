import React, { Fragment } from "react"

const UserEditable = ({ user, onInputChange }) => {
  const labels = ["First Name", "Last Name", "Email", "Gender", "Username", "Password", "Hex Color"]
  const infoJsx = Object.keys(user).map(key => {
    if (key === 'avatar_image' || key === 'user_id') return null

    const value = user[key]
    const label = labels.shift()

    return (
      <Fragment key={label}>
        <div>{label}</div>
        <input 
          placeholder={value} 
          className="user-detail-input" 
          id={key} 
          onChange={onInputChange} 
          value={value}
        />
      </Fragment>
    )
  })

  return infoJsx
}

export default UserEditable