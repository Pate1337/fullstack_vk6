import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  loggedUser: loggedUserReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
