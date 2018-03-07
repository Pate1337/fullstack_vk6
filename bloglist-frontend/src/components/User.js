import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { usersInitialization } from '../reducers/userReducer'

class User extends React.Component {

  render() {
    console.log('Renderöidään User')
    /*Jotta toimis kunnolla nii täällä pitää olla this.props.users*/
    /**/
    return (
      <tbody>
        <tr>
          <td><Link to={`/users/${this.props.user.id}`}>{this.props.user.name}</Link></td>
          <td>{this.props.user.blogs}</td>
        </tr>
      </tbody>
    )
  }
}

/*Ensinnäikin tänne ownProps.userApp ja ownProps.userBlogList*/
/*this.props.users on myös undefined*/
/*Kato ensin, että tuleeko tänne ownPropsina user muuttamalla nimet
Appissa ja BlogListissa. Jos ei tuu, niin Tee ComponentDidMount*/
const mapStateToProps = (state, ownProps) => {
  return {
    users: state.loggedUser,
    user: ownProps.user
  }
}

const mapDispatchToProps = {
  usersInitialization
}

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser
