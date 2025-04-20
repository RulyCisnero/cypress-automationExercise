@regression
Feature: Place order registering during checkout
  Scenario: User adds products to cart, registers during checkout, and places an order
    Given I visit the home page TC-14
    When I add products to the cart
    Then I should see the cart page
    When I click 'Proceed To Checkout'
    And I click the 'Register-Login' button modal
    And I complete the registration form and create the account
    Then I should see the account created confirmation with API check
    Then I should see 'Logged in as username'
    When I click the 'Cart' button
    And I click 'Proceed To Checkout'
    Then I should see address details and order summary
    When I write a comment for the order and click 'Place Order'
    And I fill out payment details and confirm the order
    Then I should see the success message for the order
    When I click 'Delete Account'
    Then I should see the message 'ACCOUNT DELETED!' and click 'Continue'
