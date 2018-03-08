import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addLoggedUser } from '../reducers/loggedUserReducer'
import { addNewUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

class SignupForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: '',
      password: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSignup = async (event) => {
    console.log('handleSignup SignupForm')
    event.preventDefault()
    const user = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    }
    const response = await this.props.addNewUser(user)
    if (response !== "error") {
      /*await this.props.addLoggedUser({user: user.username, password: user.password})*/
      /*Olisin halunnu tänne this.props.loggedUser.name mutta oli vähä vaikeeta*/
      this.props.addSuccessNotification(`Käyttäjätunnus ${user.username} luotu!`)
      setTimeout(() => {
        this.props.addSuccessNotification(null)
      }, 5000)
      this.props.history.push('/')
    } else {
      this.props.addErrorNotification('Kaikki kentät ovat pakollisia! Käyttäjätunnus voi myös olla varattu!')
      setTimeout(() => {
        this.props.addErrorNotification(null)
      }, 5000)
      this.setState({
        username: '',
        name: '',
        password: ''
      })
    }
  }

  render() {
    console.log('Renderöidään SignupForm')
    return (
      <div>
        <h2>Create a new User</h2>

        <form onSubmit={this.handleSignup}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">Create account</button>
        </form>
        <Link to="/">Back to login</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedUser: state.loggedUser,
    history: ownProps.history
  }
}
const mapDispatchToProps = {
  addSuccessNotification,
  addErrorNotification,
  addNewUser
}

const ConnectedSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

export default ConnectedSignupForm
