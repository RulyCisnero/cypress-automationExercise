@sanity
Feature: User Login Scenarios

  Scenario: User logs in with valid credentials
    Given I visit the homepage login-steps1
    When I click on the login button login-steps1
    And I enter valid credentials login-steps1
    Then You should have logged in successfully, username appears on screen login-steps1


  Scenario: Login with invalid credentials
    Given I visit the homepage login-steps1
    When I click on the login button login-steps1
    And I enter invalid email and password login-steps2
    Then I should see the error message login-steps2

  Scenario: Login with missing email
    Given I visit the homepage login-steps1
    When I click on the login button login-steps1
    And I try to login without entering an email login-steps3
    Then I should see an error message about the missing email login-steps3




