import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('blog component tests', () => {
	let component;
	let mockHandler;
	const blog = {
		title: 'This is a title',
		author: 'The author of blog'
	}
	
	beforeEach(() => {
		mockHandler = jest.fn()
		component = render(
			<Blog blog={blog} handleBlogLike={mockHandler}/>
		)
	})
	
	test ('renders title/author', () => {
		expect(component.container).toHaveTextContent(
			'This is a title'
		)
		expect(component.container).toHaveTextContent(
			'The author of blog'
		)
	})
	
	test ('likes hidden by defult', () => {
		const hidden_div = component.container.querySelector('.hiddenToggle')
		expect(hidden_div).toHaveStyle('display: none')
		expect(hidden_div).toHaveTextContent('Likes:')
	})
	
	test ('likes shown after clicking view', () => {
		const button = component.getByText('View')
		fireEvent.click(button)
		
		const visible_div = component.container.querySelector('.hiddenToggle')
		expect(visible_div).not.toHaveStyle('display: none')
		expect(visible_div).toHaveTextContent('Likes:')
		
		fireEvent.click(button)
		expect(visible_div).toHaveStyle('display: none')
	})
	
	test ('likes button clicked twice', () => {
		const view_button = component.getByText('View')
		const like_button = component.getByText('Like')
		
		fireEvent.click(like_button)
		fireEvent.click(like_button)
		
		expect(mockHandler.mock.calls).toHaveLength(2)	
	})
})

























