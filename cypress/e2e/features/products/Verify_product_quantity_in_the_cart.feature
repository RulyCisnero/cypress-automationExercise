@JIRA:AEQ-7 @smoke
Feature: Verify product quantity in the cart

  Scenario: The user selects a specific quantity of a product and verifies it in the cart
    Given  I visit the homepage -VP
    When  I click on 'View Product' for a product
    Then I should see the product details
    When I increase the quantity to 4
    And I click on the 'Add to Cart' button and get redirected to the cart
    Then I should see the product with the correct quantity in the cart
