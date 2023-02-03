/// <reference types ="cypress" />

describe('session2', ()=>{
  // it('test1', ()=>{
  //   cy.visit("https://play2.automationcamp.ir/index.html")
  //   cy.get('#fname').type("ALI")
  // })
  // it('scroll_check', ()=>{
  //   cy.visit("https://datatables.net/examples/basic_init/scroll_x.html")
  //   cy.get(':nth-child(9) > :nth-child(9)').click
  // })
  it("contains", ()=>{
    cy.visit("https://play2.automationcamp.ir/index.html")
    cy.contains("This is your form title:")
    cy.contains("label[for='moption']", "Option 2")
   cy.get("label[for='moption']").contains("Option 3")
    // cy.get("label[for='moption']").contains("option3")
  })
})