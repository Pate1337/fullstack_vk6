import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  console.log('getAll userService')
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newUser) => {
  console.log('create userService')
  const response = await axios.post(baseUrl, newUser)

  return response.data
}

export default { getAll, create }
