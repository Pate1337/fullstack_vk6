import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blogComponent

  beforeEach(() => {
    console.log('suoritetaan beforeEach')
    const blog = {
      id: '123123123',
      title: 'TestiBlogi',
      author: 'TestiBloginAuthor',
      likes: 3,
      url: 'www.testi.fi',
      user: {
        _id: '1337',
        name: 'testiUser'
      }
    }
    const user = {
      id: '1337',
      name: 'testiUser'
    }
    blogComponent = shallow(<Blog blog={blog} user={user} />)
  })

  it('at first only title and author are displayed', () => {
    let nameDiv = blogComponent.find('.titleAndAuthor')
    expect(nameDiv.getElement().props.style).toEqual({ display: '' })

    let detailDiv = blogComponent.find('.allFields')
    expect(detailDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking name the details are displayed', () => {
    let nameDiv = blogComponent.find('.titleAndAuthor')
    console.log(nameDiv.getElement().props.style)
    nameDiv.simulate('click')
    console.log(nameDiv.getElement().props.style)
    expect(nameDiv.getElement().props.style).toEqual({ display: 'none' })

    let detailDiv = blogComponent.find('.allFields')
    console.log(detailDiv.debug())
    expect(detailDiv.getElement().props.style).toEqual({ display: '' })
  })
})
