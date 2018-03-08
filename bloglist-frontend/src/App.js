import React from 'react'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import { addErrorNotification } from './reducers/notificationReducer'
import { addSuccessNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { loggedUserInitialization } from './reducers/loggedUserReducer'
import { usersInitialization } from './reducers/userReducer'
import { removeLoggedUser } from './reducers/loggedUserReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Menu from './components/Menu'
import Blog from './components/Blog'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PropTypes from 'prop-types'
import LoggedBar from './components/LoggedBar'

class App extends React.Component {

  componentDidMount() {
    console.log('mountataaan App')
    this.props.blogInitialization()
    this.props.loggedUserInitialization()
    this.props.usersInitialization()
  }

  logOut = (event) => {
    console.log('logOut App')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.removeLoggedUser()
  }

  userById = (id) => {
    console.log('userById App. Parametrina saatu id: ' + id)
    let user
    this.props.users.forEach(u => {
      if (u.id === id) {
        user = u
      }
    })
    return user
  }

  blogById = (id) => {
    console.log('blogById App. Parametrina saatu id: ' + id)
    let blog
    this.props.blogs.forEach(b => {
      if (b.id === id) {
        blog = b
      }
    })
    return blog
  }

  render() {
    console.log('renderöidään App')
    if (this.props.loggedUser === null) {
      console.log('this.props.loggedUser === null Appissa')
      /*LoginFormia ei siis renderöidä uudestaan, koska tänne ei
      päästä jos loggedUser ei ole null*/
      return (
        <div>
          <Router>
            <div className="notLogged">
              <Notification />
              <Route exact path="/" render={() => <LoginForm />} />
              <Route exact path="/signup"
                render={({history}) => <SignupForm history={history} />}
              />
            </div>
          </Router>
        </div>
      )
    }
    console.log('this.props.loggedUser !== null Appissa')
    return (
      <div>
        <Router>
          <div className="logged">
            <div>
              <h1>Blogi sovellus</h1>
              <Menu />
              <div>
                <Route path="/"
                render={({history}) => <LoggedBar history={history} />} />

              </div>
            </div>
            <Notification />
            <div>
              <Togglable buttonLabel="Lisää uusi blogi" ref={component => this.BlogForm = component}>
                <BlogForm component={this.BlogForm} />
              </Togglable>
            </div>
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({match}) =>
              <User userApp={this.userById(match.params.id)} />} />
            <Route exact path="/blogs" render={() => <BlogList />} />
            <Route exact path="/blogs/:id" render={({match}) =>
              <Blog blogApp={this.blogById(match.params.id)} />} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Appin mapStateToPros ja users pituus: ' + state.users.length)
  return {
    blogs: state.blogs,
    loggedUser: state.loggedUser,
    users: state.users
  }
}

const mapDispatchToProps = {
  addErrorNotification,
  addSuccessNotification,
  blogInitialization,
  loggedUserInitialization,
  removeLoggedUser,
  usersInitialization
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
