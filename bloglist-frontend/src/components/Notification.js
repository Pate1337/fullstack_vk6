import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render () {
    if (this.props.notification === null) {
      return null
    } else if (this.props.notification.message === null) {
      return null
    }
    if (this.props.notification.type === "success") {
      return (
        <div className="success">
          {this.props.notification.message}
        </div>
      )
    }
    return (
      <div className="error">
        {this.props.notification.message}
      </div>
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
