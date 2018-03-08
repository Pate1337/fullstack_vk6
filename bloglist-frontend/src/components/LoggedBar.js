import React from 'react'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../reducers/loggedUserReducer'

class LoggedBar extends React.Component {

  logOut = (event) => {
    console.log('logOut LoggedBar')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.removeLoggedUser()
    this.props.history.push('/')
  }

  render() {
    console.log('Renderöidään LoggedBar')
    return (
      <div>
        {this.props.user.name} logged
        <button onClick={this.logOut}>logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.loggedUser,
    history: ownProps.history
  }
}

const mapDispatchToProps = {
  removeLoggedUser
}

const ConnectedLoggedBar = connect(mapStateToProps, mapDispatchToProps)(LoggedBar)

export default ConnectedLoggedBar
