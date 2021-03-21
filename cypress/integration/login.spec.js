context('login', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/')
  })

  it('can log in', () => {
      cy.get('[data-qa=email]').type('test')
      cy.get('[data-qa=password]').type('test')
      cy.get('[data-qa=submit]').click()
  })
})
