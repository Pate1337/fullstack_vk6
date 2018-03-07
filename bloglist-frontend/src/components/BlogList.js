import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

class BlogList extends React.Component {
  render() {
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

const sortByLikes = (a, b) => {
  return parseInt(b.likes, 10) - parseInt(a.likes, 10)
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs.sort(sortByLikes),
    user: [ownProps.user]
  }
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList
