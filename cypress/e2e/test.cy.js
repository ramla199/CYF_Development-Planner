/// <reference types = "cypress"/>
describe('Dev plan project', ()=>{
  it('test1', ()=>{
cy.visit("https://cyf-dev-planner-dybk.onrender.com/")
cy.get('[href="/register"] > button')
  })
  it('register', ()=>{
  cy.visit("https://cyf-dev-planner-dybk.onrender.com/register")
  cy.get('#fname').type("Ali")
  cy.get('#lname').type("Nurisiahsiahi")
  cy.get('#username').type("ali.uk")
  cy.get('#password').type("ali123")
  cy.get('#email').type("alinurisiahsiahi@gmail.com")
  cy.get('[for="student"]').contains("Student")

  cy.get('button')



  })
})