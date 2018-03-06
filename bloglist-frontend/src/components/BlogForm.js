import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {
  constructor() {
    super()
    /*Pidetään varmuudeksi vielä title, url ja author Appissa*/
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.props.addBlog(blogObject)
    this.setState({
      title: '',
      author: '',
      url: ''
    })
    this.props.addSuccessNotification(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
    setTimeout(() => {
      this.props.addSuccessNotification(null)
    }, 5000)
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
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

const mapDispatchToProps = {
  addSuccessNotification,
  addErrorNotification,
  addBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm
