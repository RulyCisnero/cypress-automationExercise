@smoke
Feature: Verify subscription from the cart page

  Scenario: The user subscribes from the footer of the cart
    Given I visit the home page
    When I click on the cart button
    And I scroll to the footer
    Then I should see the text 'SUBSCRIPTION' on page
    When I enter an email and click the subscription button
    Then I should see the success message 'You have been successfully subscribed!' GG test
