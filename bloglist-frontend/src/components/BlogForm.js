import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { addBlogForUser } from '../reducers/userReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleSubmit = async (e) => {
    console.log('BlogForm handleSubmit')
    e.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.props.addBlog(blogObject)
    console.log('id: ' + this.props.loggedUser.id)
    this.props.addBlogForUser(this.props.loggedUser.id)
    this.setState({
      title: '',
      author: '',
      url: ''
    })
    this.props.component.toggleVisibility()
    this.props.addSuccessNotification(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
    setTimeout(() => {
      this.props.addSuccessNotification(null)
    }, 5000)
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log('Renderöidään BlogForm')
    return (
      <div>
        <h2>Lisää uusi blogi</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">lisää blogi</button>
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
  addBlog,
  addBlogForUser
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm
