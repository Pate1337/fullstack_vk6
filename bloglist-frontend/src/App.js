import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'

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
      successMessage: null,
      errorMessage: null,
      lastLiked: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      blogs.sort(this.sortByLikes)
      this.setState({ blogs })
    })
    console.log('mountataaan...')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  sortByLikes = (a, b) => {
    return parseInt(b.likes) - parseInt(a.likes)
  }

  addBlog = (event) => {
    console.log('lisätään uutta blogia')
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        console.log('Nyt pitäis olla newBlog oikeennäkönen: ', newBlog)
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
          successMessage: 'a new blog \'' + blogObject.title + '\' by '
           + blogObject.author + ' added!'
        })
        setTimeout(() => {
          this.setState({successMessage: null})
        }, 5000)
      })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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
        password: '',
        errorMessage: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ errorMessage: null })
      }, 5000)
    }
  }

  addLike = async (blog) => {
    console.log('Lisätään Tykkäys')
    const updatedBlog = await blogService.update(blog.id, blog)
    /*Voisi hoitaa myös samaantapaan kuin post metodissa, eli populatella*/
    /*Tässä jo user kenttä on pelkkä id, siksi kaikki kusee*/
    /*this.setState({
      blogs: this.state.blogs.map(b => b.id === updatedBlog._id ? updatedBlog : b)
    })*/
    blogService.getAll().then(blogs => {
      blogs.sort(this.sortByLikes)
      this.setState({
        blogs: blogs,
        lastLiked: blog.id
      })
    })
  }

  render() {
    console.log('renderöidään')
    /*const blogs = this.state.blogs.sort(this.sortByLikes)*/
    const loginForm = () => (
      <div>
        <h2>Login to application</h2>

        <form onSubmit={this.login}>
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

    if (this.state.user === null) {
      return (
        <div>
          <Notification type="error" message={this.state.errorMessage} />
          {loginForm()}
        </div>
      )
    }
    return (
      <div>
        <Notification type="success" message={this.state.successMessage} />
        <div>{this.state.user.name} logged
          <button onClick={this.logOut}>logout</button>
        </div>
        <div>
          <Togglable buttonLabel="Lisää uusi blogi">
            <BlogForm
              onSubmit={this.addBlog}
              handleChange={this.handleBlogFieldChange}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
            />
          </Togglable>
        </div>
        <h2>Blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={this.addLike} recentlyLiked={this.state.lastLiked} />
        )}
      </div>
    )
  }
}

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Lisää uusi blogi</h2>

      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">lisää blogi</button>
      </form>
    </div>
  )
}

export default App
