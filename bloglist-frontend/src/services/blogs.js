import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)

  return response.data
}

const deleteBlog = (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const id = blog.id
  return axios.delete(`${baseUrl}/${id}`, config)
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
export default { getAll, setToken, update, deleteBlog, create }
