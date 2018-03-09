import React from 'react'
import { connect } from 'react-redux'
import { addSuccessNotification } from '../reducers/notificationReducer'
import { addErrorNotification } from '../reducers/notificationReducer'
import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { deleteBlogFromUser } from '../reducers/userReducer'
import { Table } from 'semantic-ui-react'

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
    this.props.addSuccessNotification(`Lisätty tykkäys blogille ${blog.title} by ${blog.author}!`)
    setTimeout(() => {
      this.props.addSuccessNotification(null)
    }, 5000)
  }

  handleDelete = async (blog) => {
    console.log('Blog handleDelete')
    if (window.confirm('Poistetaanko \'' + blog.title + '\' by ' + blog.author + '?')) {
      const response = await this.props.deleteBlog(blog)
      if (response !== "error") {
        this.props.deleteBlogFromUser(this.props.user.id)
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
    /*Jos nyt sattuis käymään niin että delete näkyis muillekki,
    nii ei ne niitä poistaa voi ja saavat ilmotuksen*/
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (this.props.blogs.length === 0) {
      return (
        <div>LOADING :DDD</div>
      )
    }
    if (this.props.blogApp === undefined) {
      const blog = this.props.blogBlogList
      console.log('Blogiin saavuttu BlogLististä')
      const showDelete = { display: (this.props.user.id === blog.user._id) ? '' : 'none'}
      return (
        <Table.Row>
          <Table.Cell>
            <div style={onlyShowTitleAndAuthor} onClick={this.toggleVisibility} className="titleAndAuthor">
              {blog.title} {blog.author}
            </div>
            <div style={showAllInfo} onClick={this.toggleVisibility} className="allFields">
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}</Link> by {blog.author}
              <p>
                likes {blog.likes}
                <button onClick={() => this.handleLike(blog)}>like</button>
              </p>
              <div style={showDelete}>
                <button onClick={() => this.handleDelete(blog)} id={blog.id}>Delete</button>
              </div>
            </div>
          </Table.Cell>
        </Table.Row>
      )
    }
    const showDelete = { display: (this.props.user.id === this.props.blogApp.user._id) ? '' : 'none'}
    console.log('Blogiin saavuttu Appista')
    const blog = this.props.blogApp
    return (
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <p>
          Linkki blogiin:&nbsp;
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>Lisääjä {blog.user.name}</p>
        <p>Lisääjän id {blog.user._id}</p>
        <p>
          likes {blog.likes}
          <button onClick={() => this.handleLike(blog)}>like</button>
        </p>
        <div style={showDelete}>
          <button onClick={() => this.handleDelete(blog)} id={blog.id}>Delete</button>
        </div>
        <p>Halusin pitää tuon mahdollisuuden nähdä enemmän tietoa painamalla blogin nimeä.</p>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.loggedUser,
    blogBlogList: ownProps.blogBlogList,
    blogApp: ownProps.blogApp,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addSuccessNotification,
  addErrorNotification,
  addLike,
  deleteBlog,
  deleteBlogFromUser
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog

/*<div style={blogStyle}>
  <div style={onlyShowTitleAndAuthor} onClick={this.toggleVisibility} className="titleAndAuthor">
    {blog.title} {blog.author}
  </div>
  <div style={showAllInfo} onClick={this.toggleVisibility} className="allFields">
    <Link to={`/blogs/${blog.id}`}>
      {blog.title}</Link> by {blog.author}
    <p>
      likes {blog.likes}
      <button onClick={() => this.handleLike(blog)}>like</button>
    </p>
    <div style={showDelete}>
      <button onClick={() => this.handleDelete(blog)} id={blog.id}>Delete</button>
    </div>
  </div>
</div>*/
