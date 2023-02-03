describe('suite 1', () => {
  it('1-google search', () => {
    cy.visit('https://www.google.com/')
    cy.get("input[name=q]")

  })
  it('2-cypress website',()=>{
    cy.visit("https://cypress.io")
    cy.title().should('eq',"JavaScript Web Testing and Component Testing Framework | cypress.io" )
    cy.title().should('include',"JavaScript Web Testing and Component Testing Framework" )
  })
})