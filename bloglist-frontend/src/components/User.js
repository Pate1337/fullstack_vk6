import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { usersInitialization } from '../reducers/userReducer'
import { Table, Button, Icon } from 'semantic-ui-react'

class User extends React.Component {
  render() {
    console.log('Renderöidään User')
    if (this.props.users.length === 0) {
      return (
        <div>LOADING :DDD</div>
      )
    } else if (this.props.userApp === undefined) {
      console.log('Useriin saavuttu UserLististä')
      return (
        <Table.Row>
          <Table.Cell><Link to={`/users/${this.props.userUserList.id}`}>{this.props.userUserList.username}</Link></Table.Cell>
          <Table.Cell>{this.props.userUserList.blogs}</Table.Cell>
        </Table.Row>
      )
    }
    console.log('Useriin saavuttu suoraan Appista')
    console.log('Blogien pituus: ' + this.props.blogs.length)
    return (
      <div>
        <h2>Käyttäjän {this.props.userApp.username} lisäämät blogit</h2>
        <ul>
          {this.props.blogs.map(blog => {
            if (blog.user._id === this.props.userApp.id) {
              return (<li key={blog.id}>{blog.title} by {blog.author}</li>)
            }
          })}
        </ul>
        <div>
          <Button icon labelPosition='left'>
            <Link to="/users">Takaisin käyttäjiin</Link>
            <Icon name='left arrow' />
          </Button>
        </div>
      </div>
    )
  }
}
/*blog.user._id ja this.props.userApp.id*/
/*Ensinnäikin tänne ownProps.userApp ja ownProps.userBlogList*/
/*this.props.users on myös undefined*/
/*Kato ensin, että tuleeko tänne ownPropsina user muuttamalla nimet
Appissa ja BlogListissa. Jos ei tuu, niin Tee ComponentDidMount*/
const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    userApp: ownProps.userApp,
    userUserList: ownProps.userUserList,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  usersInitialization
}

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser

/*<tbody>
  <tr>
    <td><Link to={`/users/${this.props.userUserList.id}`}>{this.props.userUserList.username}</Link></td>
    <td>{this.props.userUserList.blogs}</td>
  </tr>
</tbody>*/
