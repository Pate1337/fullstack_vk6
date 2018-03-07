import loginService from '../services/login'

const loggedUserReducer = (state = null, action) {
  switch(action.type) {
    case 'LOGIN':
      return null
    case 'LOGOUT':
      return null
    default:
      return state
  }
}
