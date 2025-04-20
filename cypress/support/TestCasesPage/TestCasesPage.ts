export class TestCasesPage {
    // Selectores como métodos privados
    private testCasePageButton() {
      return cy.get('a[href="/test_cases"]');
    }
  
    private titlesTestCases() {
      return cy.get('.panel-title a');
    }
  
    clickTestCasePageButton() {
      this.testCasePageButton().eq(0).click();
    }
  
    allTitlesTestCases() {
      this.titlesTestCases().each(($el, index) => {
        const text = $el.text().trim();
        cy.log(`${index}-: ${text}`);
      });
    }
  }
  