import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addNewUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Form, Button, Icon } from 'semantic-ui-react'

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
    if (user.username === '' || user.name === '') {
      this.props.addErrorNotification('Kaikki kentät ovat pakollisia!')
      setTimeout(() => {
        this.props.addErrorNotification(null)
      }, 5000)
      this.setState({
        username: '',
        name: '',
        password: ''
      })
      return null
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
      this.props.addErrorNotification('Salasana oltava vähintään 3 merkkiä! Käyttäjätunnus voi myös olla varattu!')
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
        <h2>Luo uusi käyttäjä</h2>

        <Form onSubmit={this.handleSignup}>
          <Form.Field required>
            <label>Käyttäjätunnus:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Nimi:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Salasana:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Button color='green' icon labelPosition='right' type="submit">
            Luo käyttäjätili
            <Icon name='right arrow' />
          </Button>
        </Form>
        <br/>
        <div>
          <Button icon labelPosition='left'>
            <Link to="/">Takaisin sisäänkirjautumiseen</Link>
            <Icon name='left arrow' />
          </Button>
        </div>
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
