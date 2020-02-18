import React from "react";
import { Dropdown } from "semantic-ui-react";

const UserDropdown = ({ loggedInUser }) => {
  const { first_name, last_name, email, gender, username, hex_color, avatar_image } = loggedInUser

  return (
    <Dropdown icon="user">
        <Dropdown.Menu>
          <Dropdown.Item image={avatar_image} description='avatar' />
          <Dropdown.Item text={`${first_name} ${last_name}`} description='full name' />
          <Dropdown.Item text={email} description='email' />
          <Dropdown.Item text={gender} description='gender' />
          <Dropdown.Item text={username} description='username' />
          <Dropdown.Item text={hex_color} description='hex color' />
        </Dropdown.Menu>
      </Dropdown>
  )
}

export default UserDropdown