require('@testing-library/cypress/add-commands')

Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-test="${selector}"]`)
}) 