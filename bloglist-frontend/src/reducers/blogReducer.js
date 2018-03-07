import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch(action.type) {
    case 'CREATE_NEW':
      return [...store, action.data]
    case 'LIKE':
      let old = []
      store.forEach(b => {
        if (b.id === action.id) {
        } else {
          old.push(b)
        }
      })
      let liked = []
      store.forEach(b => {
        if (b.id === action.id) {
          liked.push(b)
        }
      })
      return [...old, {...liked[0], likes: liked[0].likes + 1}]
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE':
      const newBlogList = store.filter(blog => blog.id !== action.id)
      return newBlogList
    default:
      return store
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_NEW',
      data: newBlog
    })
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const newBlog = {...blog, likes: blog.likes + 1}
    const updatedBlog = await blogService.update(newBlog.id, newBlog)
    /*Tämän jälkeen renderöidään blogissa*/
    dispatch({
      type: 'LIKE',
      id: updatedBlog._id
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog)
      dispatch({
        type: 'DELETE',
        id: blog.id
      })
    } catch (exception) {
      console.log('toimii')
      return "error"
    }
  }

}

export default blogReducer
