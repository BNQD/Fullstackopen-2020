describe ('Blog app', function() {
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
	
	it('Login form is shown by default', function () {
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

})