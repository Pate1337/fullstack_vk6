import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch(action.type) {
    case 'CREATE_NEW':
      console.log('Luodaan uusi Blogi BlogReducerissa')
      return [...store, action.data]
    case 'LIKE':
      console.log('Lisätään tykkäys BlogReducerissa')
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
      console.log('Initoidaan blogit BlogReducerissa')
      return action.data
    case 'DELETE':
      console.log('Poistetaan blogi BlogReducerissa')
      const newBlogList = store.filter(blog => blog.id !== action.id)
      return newBlogList
    default:
      console.log('Case default BlogReducerissa')
      return store
  }
}

export const addBlog = (blogObject) => {
  console.log('addBlog blogReducer')
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_NEW',
      data: newBlog
    })
  }
}

export const blogInitialization = () => {
  console.log('blogInitialization blogReducer')
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = (blog) => {
  console.log('addLike blogReducer')
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
  console.log('deleteBlog blogReducer')
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog)
      dispatch({
        type: 'DELETE',
        id: blog.id
      })
    } catch (exception) {
      return "error"
    }
  }

}

export default blogReducer
