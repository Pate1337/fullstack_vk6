import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  render () {
    console.log('Renderöidään Notification')
    if (this.props.notification === null) {
      return null
    } else if (this.props.notification.message === null) {
      return null
    }
    if (this.props.notification.type === "success") {
      return (
        <Message success>
          {this.props.notification.message}
        </Message>
      )
    }
    return (
      <Message error>
        {this.props.notification.message}
      </Message>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
