@smoke
Feature: Add products to the cart
  @owner:Ruly @severity:critical
  Scenario: The user adds two products to the cart from the products page
    Given I visit the homepage for products
    When I click on the Products button
    And I add the first product to the cart
    And I click on the 'Continue Shopping' button
    And I add the second product to the cart
    And I click on the 'View Cart' button
    When I should see both products in the cart

