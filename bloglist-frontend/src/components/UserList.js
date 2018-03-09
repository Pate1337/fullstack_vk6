import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import { Table } from 'semantic-ui-react'

class UserList extends React.Component {
  render() {
    console.log('Renderöidään UserList')
    return (
      <div>
        <Table striped celled unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Users</Table.HeaderCell>
              <Table.HeaderCell>Blogs added</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user =>
              <User key={user.id} userUserList={user} />
            )}
          </Table.Body>
        </Table>
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

/*<div>
  <h2>Users</h2>
  <table>
    <tbody>
      <tr>
        <td></td>
        <td><strong>Blogs added</strong></td>
      </tr>
    </tbody>
    {this.props.users.map(user =>
      <User key={user.id} userUserList={user} />
    )}
  </table>
</div>*/
