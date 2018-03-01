import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

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
    return parseInt(b.likes, 10) - parseInt(a.likes, 10)
  }

  addBlog = (event) => {
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
    await blogService.update(blog.id, blog)
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

  deleteBlog = (event) => {
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
          this.setState({
            blogs: newBlogList,
            successMessage: blog.title + ' poistettu!'
          })
          setTimeout(() => {
            this.setState({successMessage: null})
          }, 5000)
        })
        .catch(error => {
          this.setState({
            errorMessage: 'Can\'t delete other user\'s blogs'
          })
          setTimeout(() => {
            this.setState({
              errorMessage: null
            })
          }, 5000)
        })
    }
  }

  render() {
    console.log('renderöidään')
    /*const blogs = this.state.blogs.sort(this.sortByLikes)*/

    if (this.state.user === null) {
      return (
        <div>
          <Notification type="error" message={this.state.errorMessage} />
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
      <div>
        <Notification type="success" message={this.state.successMessage} />
        <Notification type="error" message={this.state.errorMessage} />
        <div>{this.state.user.name} logged
          <button onClick={this.logOut}>logout</button>
        </div>
        <div>
          <Togglable buttonLabel="Lisää uusi blogi" ref={component => this.BlogForm = component}>
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
          <Blog key={blog.id} blog={blog} handleLike={this.addLike} user={this.state.user} deleteBlog={this.deleteBlog}/>
        )}
      </div>
    )
  }
}

export default App
