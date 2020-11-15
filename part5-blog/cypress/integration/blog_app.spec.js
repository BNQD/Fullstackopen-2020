const chaiSorted=require('chai-sorted')
chai.use(chaiSorted)

Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3001/api/users/login', {
		username, password
	}).then (({ body }) => {
		localStorage.setItem('User', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlog', ({ title, author }) => {
	cy.request({
		url: 'http://localhost:3001/api/blogs',
		method: 'POST', 
		body: { title, author },
		headers: {
			Authorization: `bearer ${JSON.parse(localStorage.getItem('User')).token}`
		}
	})
	cy.visit('http://localhost:3000')
})

describe ('blog app', function() {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'TestName',
			username: 'Test',
			password: 'TestPW'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})
	
	it('login form is shown by default', function () {
		cy.contains('Login')
	})
	
	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('Test')
			cy.get('#password').type('TestPW')
			cy.get('#login-button').click()
			
			cy.contains('Logged in as TestName')
		})
		
		it('fails with incorrect credentials', function () {
			cy.get('#username').type('tststst')
			cy.get('#password').type('235tes253')
			cy.get('#login-button').click()
			
			cy.contains('Error: Incorrect username or password')
			
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
			
		})
	})
	
	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username:'Test', password: 'TestPW'})
		})
		
		it('create blog not displayed by default', function () {
			cy.get('#blog-creation-form').parent().should('have.css', 'display', 'none')
		})

		it('can create a blog', function () {
			cy.contains('Create Blog').click()
			cy.get('#blog-form-title').type('Test title')
			cy.get('#blog-form-author').type('Test author')
			cy.get('#blog-form-button').click()
			
			cy.get('.success').contains('Test title by Test author created!')
			cy.get('#blog-list').contains('Test title')
		})
		
		it('can like a blog', function () {
			cy.createBlog({ title: 'Test title', author: 'Test author' })
			
			cy.get('#blog-list').contains('Test title').contains('View').click()
			cy.get('#blog-list').contains('Test title').contains('Likes: 0')
			
			cy.get('#blog-list').contains('Test title').get('.blog-like-button').click()
			cy.get('#blog-list').contains('Test title').contains('Likes: 1')
		})
		
		it('can delete a blog', function () {
			cy.createBlog({ title: 'Test title', author: 'Test author' })
			
			cy.get('#blog-list').contains('Test title').contains('View').click()
			cy.get('#blog-list').contains('Test title').get('.blog-delete-button').click()
			cy.get('#blog-list').contains('Test title').should('not.exist')
			
		})
		
		it.only('blogs are sorted by likes', function () {
			const blog_likes = [4, 2, 1]
			
			cy.createBlog({ title: 'Test title 1', author: 'Test author 1' })
			cy.createBlog({ title: 'Test title 2', author: 'Test author 2' })
			cy.createBlog({ title: 'Test title 3', author: 'Test author 3' })
			
			for (let i = 1; i< 4; i++) { 
				cy.get('#blog-list').contains(`Test title ${i}`).contains('View').click() 
				for (let j = 1; j<blog_likes[i-1]; j++){
					cy.get('#blog-list').contains(`Test title ${i}`).find('.blog-like-button').click() 
				}
			}
			cy.get('#blog-list').get('.blog-likes').as('blogs')
			
			cy.get('@blogs').then($blogs => {
				expect([$blogs[0].outerText, $blogs[1].outerText, $blogs[2].outerText]).to.be.sorted({ descending: true })
			})
			
		})
	})

})