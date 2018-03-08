import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  const activeStyle = {
    backgroundColor: 'rgb(0, 206, 96)'
  }

  return (
    <div>
      <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>&nbsp;
      <NavLink exact to="/users" activeStyle={activeStyle}>Users</NavLink>&nbsp;
      <NavLink exact to="/blogs" activeStyle={activeStyle}>Blogs</NavLink>
    </div>
  )
}

export default Menu
