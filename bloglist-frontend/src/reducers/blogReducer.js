import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch(action.type) {
    case 'CREATE_NEW':
      return [...store, action.data]
    case 'LIKE':
      console.log('Nyt lisäiltäs likeä')
      console.log('Jos storen pituus on 14 niin mitä vittua: ' + store.length)
      console.log('tykätyn blogin id: ' + action.id)
      let old = []
      store.forEach(b => {
        if (b.id === action.id) {
          console.log(b.id)
        } else {
          old.push(b)
        }
      })
      console.log('Old taulukko blogReducerissa: ' + old.length)
      let liked = []
      store.forEach(b => {
        if (b.id === action.id) {
          liked.push(b)
        }
      })
      console.log('Liked taulukko blogReducerissa: ' + liked.length)

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
    console.log('getAllista saadut blogit: ')
    blogs.forEach(b => {
      console.log(b)
    })
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    console.log('Vanha blogi addlikessa(likes): ' + blog.id)
    const newBlog = {...blog, likes: blog.likes + 1}
    console.log('Uusi blogi addLikessa(likes): ' + newBlog.id)
    const updatedBlog = await blogService.update(newBlog.id, newBlog)
    /*Tämän jälkeen renderöidään blogissa*/
    console.log('Päivitetty blogi addlikessa: ' + updatedBlog._id)
    dispatch({
      type: 'LIKE',
      id: updatedBlog._id
    })
  }
}

export const deleteBlog = (blog) => {
  if (window.confirm('Poistetaanko \'' + blog.title + '\' by ' + blog.author + '?')) {
    blogService
      .deleteBlog(blog)
      .then(response => {
        return async (dispatch) => {
          dispatch({
            type: 'DELETE',
            id: blog.id
          })
        }
      })
      .catch(error => {
        return "error"
      })
  }
  return null
}

export default blogReducer
