import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'


class BlogList extends React.Component {
  constructor(props) {
    super(props)
  }

/*  handleLike = async (blog) => {
    this.props.addLike(blog)
    console.log('Blogi handleLikessa: ' + blog)
    this.props.addSuccessNotification('tänne tekstiä')
    setTimeout(() => {
      this.props.addSuccessNotification(null)
    }, 5000)
  }

  handleDelete = async (blog) => {
    const result = this.props.deleteBlog(blog)
    if (result === "error") {
      this.props.addErrorNotification('Can\'t delete other user\'s blogs')
      setTimeout(() => {
        this.props.addErrorNotification(null)
      }, 5000)
    } else if (result !== null) {
      this.props.addSuccessNotification(`${blog.title} poistettu!`)
      setTimeout(() => {
        this.props.addSuccessNotification(null)
      }, 5000)
    }
  }
*/
  render() {
    console.log('Bloglistin render blogiLista: ')
    this.props.blogs.forEach(b => console.log(b))
    return (
      <div>
        <h2>Blogs</h2>
        {this.props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={this.props.user} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs,
    user: [ownProps.user]
  }
}


const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList
