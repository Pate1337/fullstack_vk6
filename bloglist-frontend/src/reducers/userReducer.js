import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      console.log('Initoidaan käyttäjät userReducerissa')
      return action.data
    case 'NEW_USER':
      console.log('Lisätään uusi käyttäjä userReducer')
      return [...store, action.data]
    case 'ADD_BLOG':
      console.log('Lisätään blogi käyttäjälle userService')
      let old = []
      let modified = []
      store.forEach(u => {
        if (u.id === action.data) {
          modified.push(u)
        } else {
          old.push(u)
        }
      })
      return [...old, {...modified[0], blogs: modified[0].blogs + 1}]
    case 'DELETE_BLOG':
      console.log('Poistetaan blogi käyttäjältä')
      old = []
      modified = []
      store.forEach(u => {
        if (u.id === action.data) {
          modified.push(u)
        } else {
          old.push(u)
        }
      })
      return [...old, {...modified[0], blogs: modified[0].blogs - 1}]
    default:
      console.log('case default userReducerissa')
      return store
  }
}

export const usersInitialization = () => {
  console.log('usersInitialization userReducer')
  /*blogeja ei saanu muodossa blogs: [{blog1}, {blog2}]*/
  const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      blogs: user.blogs.length
    }
  }

  return async (dispatch) => {
    const users = await userService.getAll()
    let formattedUsers = []
    users.forEach(u => {
      formattedUsers.push(formatUser(u))
    })
    dispatch({
      type: 'INIT_USERS',
      data: formattedUsers
    })
  }
}

export const addBlogForUser = (userId) => {
  console.log('addBlogForUser userService')
  return async (dispatch) => {
    dispatch({
      type: 'ADD_BLOG',
      data: userId
    })
  }
}

export const deleteBlogFromUser = (userId) => {
  console.log('deleteBlogFromUser userService')
  return async (dispatch) => {
    dispatch({
      type: 'DELETE_BLOG',
      data: userId
    })
  }
}

export const addNewUser = (userObject) => {
  console.log('addNewUser userReducer')
  const formatUser = (user) => {
    return {
      id: user._id,
      username: user.username,
      name: user.name,
      blogs: user.blogs.length
    }
  }
  return async (dispatch) => {
    try {
      const user = await userService.create(userObject)
      const formattedUser = formatUser(user)
      dispatch({
        type: 'NEW_USER',
        data: formattedUser
      })
    } catch(exception) {
      return "error"
    }
  }
}

export default userReducer
