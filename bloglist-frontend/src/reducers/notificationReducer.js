const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('Asetetaan notifikaatio notificationReducerissa')
      return action.data
    default:
      console.log('case default notificationReducerissa')
      return state
  }
}

export const addSuccessNotification = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {message: message, type: "success"}
    })
  }
}

export const addErrorNotification = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {message: message, type: "error"}
    })
  }
}


export default notificationReducer
