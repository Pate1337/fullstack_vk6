let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "TestiTitle1",
    author: "TestiAuthor1",
    url: "TestiUrl1",
    likes: 0,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "TestiTitle2",
    author: "TestiAuthor2",
    url: "TestiUrl2",
    likes: 1,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "TestiTitle3",
    author: "TestiAuthor3",
    url: "TestiUrl3",
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }
