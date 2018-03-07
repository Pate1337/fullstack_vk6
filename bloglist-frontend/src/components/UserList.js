import React from 'react'
import { connect } from 'react-redux'
import User from './User'

class UserList extends React.Component {
  render() {
    console.log('Renderöidään UserList')
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td><strong>Blogs added</strong></td>
            </tr>
          </tbody>
          {this.props.users.map(user =>
            <User key={user.id} user={user} />
          )}
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList
