import React from 'react'
import Blog from './components/Blog'
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
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      lastLiked: null
    }
  }

  componentDidMount() {
    /*blogService.getAll().then(blogs => {
      blogs.sort(this.sortByLikes)
      console.log('Blogit mountissa: ')
      blogs.forEach(b => {
        console.log(b)
      })
      this.setState({ blogs })
    })*/
    this.props.blogInitialization()
    console.log('mountataaan...')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  sortByLikes = (a, b) => {
    return parseInt(b.likes, 10) - parseInt(a.likes, 10)
  }

  /*this.BlogForm.toggleVisibility()*/

  /*addBlog = (event) => {
    console.log('lisätään uutta blogia')
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.BlogForm.toggleVisibility()
    blogService
      .create(blogObject)
      .then(newBlog => {
        console.log('Nyt pitäis olla newBlog oikeennäkönen: ', newBlog)
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: ''
        })
        this.props.addSuccessNotification(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
        setTimeout(() => {
          this.props.addSuccessNotification(null)
        }, 5000)
      })
  }
*/
/*  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
*/
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
/*
  addLike = async (blog) => {
    console.log('Lisätään Tykkäys')
    await blogService.update(blog.id, blog)
    blogService.getAll().then(blogs => {
      blogs.sort(this.sortByLikes)
      console.log('Blogit kun niistä tykätään: ')
      blogs.forEach(b => {
        console.log(b)
      })
      this.props.addSuccessNotification(`Tykkäys lisätty blogille ${blog.title}!`)
      setTimeout(() => {
        this.props.addSuccessNotification(null)
      }, 5000)
      this.setState({
        blogs: blogs
      })
    })
  }
*/
/*  deleteBlog = (event) => {
    event.preventDefault()
    const blogId = event.target.id
    console.log('Postetattavan blogin id: ', blogId)
    const blog = this.state.blogs.find(blog => blog.id === blogId)
    console.log('Blogeista löydetty blogi: ', blog)

    if (window.confirm('Poistetaanko \'' + blog.title + '\' by ' + blog.author + '?')) {
      blogService
        .deleteBlog(blog)
        .then(response => {
          const newBlogList = this.state.blogs.filter(blog => blog.id !== blogId)
          newBlogList.sort(this.sortByLikes)
          this.props.addSuccessNotification(`${blog.title} poistettu!`)
          setTimeout(() => {
            this.props.addSuccessNotification(null)
          }, 5000)
          this.setState({
            blogs: newBlogList
          })
        })
        .catch(error => {
          this.props.addErrorNotification('Can\'t delete other user\'s blogs')
          setTimeout(() => {
            this.props.addErrorNotification(null)
          }, 5000)
        })
    }
  }
*/
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
            <BlogForm />
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
