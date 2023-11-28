/// <reference types="cypress" />

describe('Guest test', () => {
	it('should have search input', () => {
		cy.visit('/');
		cy.get('[data-cy="search"]').should('have.text', '');
	});

	it('should change search value', () => {
		cy.visit('/');
		cy.get('[data-cy="search"]').type('Spider');
		cy.get('[data-cy="search"]').should('have.value', 'Spider');
	});

	it('should have suggest list', () => {
		cy.visit('/');
		cy.get('[data-cy="search"]').type('Spider');
		cy.get('[data-cy="search"]').should('have.value', 'Spider');
		cy.get('[data-cy="suggest-list"]').should('exist');
	});

	it('should redirect to comics page', () => {
		cy.visit('/');
		cy.get('[data-cy="search"]').type('Spider');
		cy.get('[data-cy="search"]').should('have.value', 'Spider');
		cy.get('[data-cy="suggest-list"]').should('exist');
		cy.get('[data-cy="suggest-link"]').should('exist');
		cy.get('[data-cy="suggest-link"]').first().click();
		cy.url().should('include', '/comics/');
		cy.get('[data-cy="comics-thumnail"]').should('exist');
	});
});
