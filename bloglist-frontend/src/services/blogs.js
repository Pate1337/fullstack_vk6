import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  console.log('getAll blogsService')
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  console.log('setToken blogsService')
  token = `bearer ${newToken}`
}

const update = async (id, newObject) => {
  console.log('update blogService')
  const response = await axios.put(`${baseUrl}/${id}`, newObject)

  return response.data
}

const deleteBlog = async (blog) => {
  console.log('deleteBlog blogService')
  const config = {
    headers: { 'Authorization': token }
  }
  const id = blog.id
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObject) => {
  console.log('create blogService')
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
export default { getAll, setToken, update, deleteBlog, create }
