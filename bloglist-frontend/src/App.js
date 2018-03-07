import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { addErrorNotification } from './reducers/notificationReducer'
import { addSuccessNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import BlogList from './components/BlogList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    this.props.blogInitialization()
    console.log('mountataaan...')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logOut = (event) => {
    console.log('kirjaudutaan ulos')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({ user: null })
  }


  login = async (event) => {
    console.log('kirjaudutaan sisään')
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        username: '',
        password: ''
      })
      this.props.addErrorNotification('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        this.props.addErrorNotification(null)
      }, 5000)
    }
  }

  render() {
    console.log('renderöidään')
    if (this.state.user === null) {
      return (
        <div className="notLogged">
          <Notification />
          <LoginForm
            login={this.login}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
          />
        </div>
      )
    }
    return (
      <div className="logged">
        <Notification />
        <div>{this.state.user.name} logged
          <button onClick={this.logOut}>logout</button>
        </div>
        <div>
          <Togglable buttonLabel="Lisää uusi blogi" ref={component => this.BlogForm = component}>
            <BlogForm component={this.BlogForm} />
          </Togglable>
        </div>
        <BlogList user={this.state.user} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addErrorNotification,
  addSuccessNotification,
  blogInitialization
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
