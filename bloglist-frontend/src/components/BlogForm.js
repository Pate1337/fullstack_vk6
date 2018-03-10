import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { addBlogForUser } from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      visible: false,
      titleMissing: false,
      authorMissing: false,
      urlMissing: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      title: '',
      author: '',
      url: '',
      visible: !this.state.visible
    })
  }


  handleSubmit = async (e) => {
    console.log('BlogForm handleSubmit')
    e.preventDefault()
    let titleMissing = false
    let authorMissing = false
    let urlMissing = false
    if (this.state.title === '') {
      titleMissing = true
    }
    if (this.state.author === '') {
      authorMissing = true
    }
    if (this.state.url === '') {
      urlMissing = true
    }
    if (titleMissing || authorMissing || urlMissing) {
      this.props.addErrorNotification(`All fields are required!`)
      setTimeout(() => {
        this.props.addErrorNotification(null)
      }, 3000)
      this.setState({
        title: '',
        author: '',
        url: '',
        titleMissing: titleMissing,
        authorMissing: authorMissing,
        urlMissing: urlMissing
      })
    } else {
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
        url: '',
        visible: !this.state.visible
      })

      this.props.addSuccessNotification(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        this.props.addSuccessNotification(null)
      }, 5000)
    }
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    console.log('Renderöidään BlogForm')
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={this.toggleVisibility}>Lisää uusi blogi</Button>
          <br/>
        </div>
        <div style={showWhenVisible}>
        <h2>Lisää uusi blogi</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label>title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogFieldChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>author:</label>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogFieldChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>url:</label>
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleBlogFieldChange}
            />
          </Form.Field>

          <Button.Group>
            <Button type="submit" positive>
              Add Blog
            </Button>
            <Button.Or />
            <Button type="button" onClick={this.toggleVisibility}>
              Cancel
            </Button>
          </Button.Group>
        </Form>
        </div>
        <br/>
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
