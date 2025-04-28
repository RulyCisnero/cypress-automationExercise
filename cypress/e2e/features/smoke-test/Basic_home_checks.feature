@smoke
Feature: Basic home checks

  Scenario: The main banner is displayed correctly
    Given I visit the home page
    Then I should see the main banner

  Scenario: The user can subscribe to the newsletter
    Given I visit the home page
    When I write a valid email
    And I click the subscribe button
    Then I should see the success subscription message

  Scenario: The login is displayed correctly
    Given I visit the home page
    When I click the 'Register-Login' button
    Then I should see the login-signup form
