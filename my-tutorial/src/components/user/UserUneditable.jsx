import React, { Fragment } from "react"

const UserUneditable = ({ user }) => {
  const labels = ["Name", "Email", "Gender", "Username", "Password", "Hex Color"]
  const infoJsx = Object.keys(user).map(key => {
    if (key === 'avatar_image' || key === 'user_id' || key === 'last_name') return null
    
    const value = user[key]
    const label = labels.shift()

    if (key === 'first_name') {
      return (
        <Fragment key={label}>
          <div>{label}</div>
          <p>{user.first_name} {user.last_name}</p>
        </Fragment>
      )
    }

    return (
      <Fragment key={label}>
        <div>{label}</div>
        <p>{value}</p>
      </Fragment>
    )
  })

  return infoJsx
}

export default UserUneditable