import React from 'react'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { addErrorNotification } from './reducers/notificationReducer'
import { addSuccessNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { loggedUserInitialization } from './reducers/loggedUserReducer'
import { removeLoggedUser } from './reducers/loggedUserReducer'
import BlogList from './components/BlogList'

class App extends React.Component {

  componentDidMount() {
    console.log('mountataaan...')
    this.props.blogInitialization()
    this.props.loggedUserInitialization()
  }

  logOut = (event) => {
    console.log('kirjaudutaan ulos')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.removeLoggedUser()
  }

  render() {
    console.log('renderöidään')
    if (this.props.loggedUser === null) {
      /*LoginFormia ei siis renderöidä uudestaan, koska tänne ei
      päästä jos loggedUser ei ole null*/
      return (
        <div className="notLogged">
          <Notification />
          <LoginForm />
        </div>
      )
    }
    console.log('user Appissa: ' + this.props.loggedUser.name)
    return (
      <div className="logged">
        <Notification />
        <div>{this.props.loggedUser.name} logged
          <button onClick={this.logOut}>logout</button>
        </div>
        <div>
          <Togglable buttonLabel="Lisää uusi blogi" ref={component => this.BlogForm = component}>
            <BlogForm component={this.BlogForm} />
          </Togglable>
        </div>
        <BlogList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Appin mapStateToPros')
  return {
    blogs: state.blogs,
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  addErrorNotification,
  addSuccessNotification,
  blogInitialization,
  loggedUserInitialization,
  removeLoggedUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
