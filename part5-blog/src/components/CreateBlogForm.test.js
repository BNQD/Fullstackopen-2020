import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateBlogForm from './CreateBlogForm'



describe('blog form tests', () => {
	let component
	let createNote
	let setMsg
	beforeEach(() => {
		createNote = jest.fn()
		setMsg = jest.fn()
		component = render(
			<CreateBlogForm handleFormCreation={createNote} setMessage={setMsg}/>
		)
	})
	
	test('input details', () => {
		const form = component.container.querySelector('form')
		const title_field = component.container.querySelector('#BlogFormTitle')
		const author_field = component.container.querySelector('#BlogFormAuthor')
		
		fireEvent.change(title_field, {
			target: { value: 'This is a testing title' }
		})
		
		fireEvent.change(author_field, {
			target: { value: 'This is the test author' }
		})
		
		fireEvent.submit(form)
		
		expect(setMsg.mock.calls).toHaveLength(1)
		expect(createNote.mock.calls).toHaveLength(1)
		expect(createNote.mock.calls[0][0].title).toBe('This is a testing title')
		expect(createNote.mock.calls[0][0].author).toBe('This is the test author')
		expect(createNote.mock.calls[0][0].likes).toBe(0)
		
	})
})
