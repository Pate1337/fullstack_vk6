import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MenuBar = () => {

  const activeStyle = {
    backgroundColor: "grey"
  }

  return (
    <div>
      <Menu inverted>
        <Menu.Item link>
          <NavLink exact to="/" activeStyle={activeStyle}>Etusivu</NavLink>&nbsp;
        </Menu.Item>
        <Menu.Item link>
          <NavLink exact to="/users" activeStyle={activeStyle}>Käyttäjät</NavLink>&nbsp;
        </Menu.Item>
        <Menu.Item link>
          <NavLink exact to="/blogs" activeStyle={activeStyle}>Blogit</NavLink>
        </Menu.Item>
      </Menu>
      <br/>
    </div>
  )

}



export default MenuBar
