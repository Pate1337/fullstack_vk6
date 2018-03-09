import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { Table } from 'semantic-ui-react'

class BlogList extends React.Component {
  render() {
    console.log('Renderöidään BlogList')
    return (
      <div>
        <h2>Blogs</h2>
        <Table striped celled unstackable>
          <Table.Body>
            {this.props.blogs.map(blog =>
              <Blog key={blog.id} blogBlogList={blog} />
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const sortByLikes = (a, b) => {
  return parseInt(b.likes, 10) - parseInt(a.likes, 10)
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort(sortByLikes)
  }
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList

/*<div>
  <h2>Blogs</h2>
  {this.props.blogs.map(blog =>
    <Blog key={blog.id} blogBlogList={blog} />
  )}
</div>*/
