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
	
	it('Login form is shown', function () {
		cy.contains('Login')
	})
})