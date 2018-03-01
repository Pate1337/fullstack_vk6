import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    console.log('Nyt ollaan Blog konstruktorissa')
    this.state = {
      showAll: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  addLike = (event) => {
    event.preventDefault()
    let modifiedBlog = this.props.blog
    modifiedBlog.likes = this.props.blog.likes + 1

    this.props.handleLike(modifiedBlog)
    /*Vois tallettaa vaikka jonku recentlyLikedId*/
  }

  render() {
    console.log('renderöidään Blogissa')
    /*Noihin alempiin voidaan laittaa toisena ehtona,
    jos this.props.blog.id === this.props.recentlyLiked, niin display: ''*/
    const showAllInfo = { display: this.state.showAll? '' : 'none' }
    const onlyShowTitleAndAuthor = { display: this.state.showAll ? 'none' : '' }
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
        <div style={onlyShowTitleAndAuthor} onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showAllInfo} onClick={this.toggleVisibility}>
          <p>{this.props.blog.title} {this.props.blog.author}</p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>Lisääjä {this.props.blog.user.name}</p>
          <p>Lisääjän id {this.props.blog.user._id}</p>
          <p>
            likes {this.props.blog.likes}
            <button onClick={this.addLike}>like</button>
          </p>
          <div style={showDelete}>
            <button onClick={this.props.deleteBlog} id={this.props.blog.id}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog
