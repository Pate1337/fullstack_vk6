import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'TestiBlogi',
      author: 'TestiBloginAuthor',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    let contentDiv = blogComponent.find('.titleAndAuthor')
    console.log(contentDiv.debug())

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)

    contentDiv = blogComponent.find('.likes')
    console.log(contentDiv.debug())

    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('clicking the button twice calls eventhandler twice', () => {
    const blog = {
      title: 'TestiBlogi',
      author: 'TestiBloginAuthor',
      likes: 3
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = blogComponent.find('button')
    console.log(button.debug())
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
