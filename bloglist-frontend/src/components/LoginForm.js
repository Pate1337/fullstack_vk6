import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addLoggedUser } from '../reducers/loggedUserReducer'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    console.log('handleLogin LoginForm')
    event.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    const response = await this.props.addLoggedUser(user)
    if (response !== "error") {
      /*Olisin halunnu tänne this.props.loggedUser.name mutta oli vähä vaikeeta*/
      this.props.addSuccessNotification(`Tervetuloa ${user.username}!`)
      setTimeout(() => {
        this.props.addSuccessNotification(null)
      }, 5000)
    } else {
      this.props.addErrorNotification('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        this.props.addErrorNotification(null)
      }, 5000)
      this.setState({
        username: '',
        password: ''
      })
    }
  }

  render() {
    console.log('Renderöidään LoginForm')
    return (
      <div>
        <h2>Login to application</h2>

        <form onSubmit={this.handleLogin}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}
const mapDispatchToProps = {
  addSuccessNotification,
  addErrorNotification,
  addLoggedUser
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
