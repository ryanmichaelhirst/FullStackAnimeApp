import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faHome, faPlus, faUsers, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserDropdown from "./UserDropdown";

export default class MenuBar extends Component {
  state = {}

  render() {
    const { loggedInUser } = this.props
    
    if (!loggedInUser)
      return null
  
    return (
      <div className="menu-bar">
        <ul className="menu-bar-icons-list">
          <li style={{ float: 'left', marginLeft: 27 }}> 
            <Link to="/home">
              Anime Data Application 
            </Link>
          </li>
          <li style={{ float: 'right', padding: 13, marginRight: 27, color: 'rgb(139, 136, 151)' }}>
            <UserDropdown loggedInUser={loggedInUser} />
          </li>
          <li> 
            <Link to="/list">
              <FontAwesomeIcon icon={faList} /> 
            </Link>
          </li>
          <li> 
            <Link to="/user">
              <FontAwesomeIcon icon={faUsers} />
            </Link>
          </li>
          <li> 
            <Link to="/add">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </li>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} /> 
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}