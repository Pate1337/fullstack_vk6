import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  handleLike = async (blog) => {
    await this.props.addLike(blog)
    this.props.addSuccessNotification('tänne tekstiä')
    setTimeout(() => {
      this.props.addSuccessNotification(null)
    }, 5000)
  }

  handleDelete = async (blog) => {
    if (window.confirm('Poistetaanko \'' + blog.title + '\' by ' + blog.author + '?')) {
      const response = await this.props.deleteBlog(blog)
      console.log(response)
      if (response !== "error") {
        this.props.addSuccessNotification(`${blog.title} poistettu!`)
        setTimeout(() => {
          this.props.addSuccessNotification(null)
        }, 5000)
      } else {
        this.props.addErrorNotification(`Can't remove other user's blogs!`)
        setTimeout(() => {
          this.props.addErrorNotification(null)
        }, 5000)
      }
    }
  }

  render() {
    console.log('renderöidään Blogissa')
    const showAllInfo = { display: this.state.showAll ? '' : 'none' }
    const onlyShowTitleAndAuthor = { display: this.state.showAll ? 'none' : '' }
    /*Jos nyt sattuis käymään niin että delete näkyis muillekki, nii ei ne niitä poistaa voi ja saavat ilmotuksen*/
    const showDelete = { display: (this.props.user.id === this.props.blog.user._id) ? '' : 'none'}
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <div style={onlyShowTitleAndAuthor} onClick={this.toggleVisibility} className="titleAndAuthor">
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showAllInfo} onClick={this.toggleVisibility} className="allFields">
          <p>{this.props.blog.title} {this.props.blog.author}</p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>Lisääjä {this.props.blog.user.name}</p>
          <p>Lisääjän id {this.props.blog.user._id}</p>
          <p>
            likes {this.props.blog.likes}
            <button onClick={() => this.handleLike(this.props.blog)}>like</button>
          </p>
          <div style={showDelete}>
            <button onClick={() => this.handleDelete(this.props.blog)} id={this.props.blog.id}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addSuccessNotification,
  addErrorNotification,
  addLike,
  deleteBlog
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlog
