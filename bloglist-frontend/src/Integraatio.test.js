import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let appComponent

  describe('when user is not logged in', () => {
    beforeEach(() => {
      appComponent = mount(<App />)
    })
    it('only show the login form', () => {
      appComponent.update()
      /*console.log(appComponent.debug())*/
      const loginDiv = appComponent.find('.notLogged')
      /*Testataan onko loginDiv näkyvillä*/
      expect(loginDiv.text()).toContain('Login to application')

      /*Koska palvelimelle kovakoodattu 3 blogia, ne pitäisi näkyä, jos kirjautunut*/
      const blogComponents = appComponent.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }

      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      appComponent = mount(<App />)
    })
    it('all blogs are rendered', () => {
      appComponent.update()
      console.log(appComponent.debug())
      const blogComponents = appComponent.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
