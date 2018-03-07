import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedUserReducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_LOGGED':
      console.log('Initoidaan kirjautunut Käyttäjä loggedUserReducerissa')
      return action.data
    case 'LOGIN':
      console.log('Kirjaudutaan sisään loggedUserReducerissa')
      return action.data
    case 'LOGOUT':
      console.log('Kirjaudutaan ulos loggedUserReducerissa')
      return null
    default:
      console.log('Case default loggedUserReducerissa')
      return state
  }
}

export const addLoggedUser = (userObject) => {
  console.log('addLoggedUser loggedUserReducer')
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      return "error"
    }
  }
}

export const loggedUserInitialization = () => {
  console.log('loggedUserInitialization loggedUserReducer')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_LOGGED',
        data: user
      })
    }
  }
}

export const removeLoggedUser = () => {
  console.log('removeLoggedUser loggedUserReducer')
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loggedUserReducer
