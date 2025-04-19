describe('Prompt Creation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should create a new prompt and display it in the list', () => {
    // Click the create new prompt button
    cy.getBySel('create-prompt-button').click()

    // Fill in the prompt form
    cy.getBySel('prompt-title-input').type('Test Prompt')
    cy.getBySel('prompt-content-input').type('This is a test prompt content')
    
    // Submit the form
    cy.getBySel('submit-prompt-button').click()

    // Verify the new prompt appears in the list
    cy.getBySel('prompt-list')
      .should('contain', 'Test Prompt')
      .and('contain', 'This is a test prompt content')
  })
}) 