import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedUserReducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_LOGGED':
      return action.data
    case 'LOGIN':
      console.log('Nyt LOGINnataan ja palautetaan state')
      console.log('Onko action.data muka null: ' + action.data.name)
      return action.data
    case 'LOGOUT':
      console.log('Ei kai täällä vaan käydä missään vaiheessa')
      return null
    default:
      console.log('Eikä täällä kiitos')

      return state
  }
}

export const addLoggedUser = (userObject) => {
  return async (dispatch) => {
    console.log('Nyt ollaan addLoggedUserissa')
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('Katsotaan onko user Object, tulostetaan nimi: ' + user.name)
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
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loggedUserReducer
