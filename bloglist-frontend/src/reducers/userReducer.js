import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      console.log('Initoidaan käyttäjät userReducerissa')
      return action.data
    default:
      console.log('case default userReducerissa')
      return store
  }
}

export const usersInitialization = () => {
  console.log('usersInitialization userReducer')
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

export default userReducer
