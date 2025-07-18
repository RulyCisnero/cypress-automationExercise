@sanity @smoke
@severity:critical @epic:Login @feature:Authentication
Feature: User Login Scenarios

  @JIRA:AEQ-10
  Scenario: User logs in with valid credentials
    Given I visit the homepage login-steps1
    When I click on the login button login-steps1
    And I enter valid credentials login-steps1
    Then You should have logged in successfully, username appears on screen login-steps1

  @JIRA:AEQ-11 @owner:Ruly @severity:normal
  Scenario: Login with invalid credentials
    Given I visit the homepage login-steps1
    When I click on the login button login-steps1
    And I enter invalid email and password login-steps2
    Then I should see the error message login-steps2

  @JIRA:AEQ-12 @owner:Ruly @severity:minor
  Scenario: Login with missing email
    Given I visit the homepage login-steps1
    When I click on the login button login-steps1
    And I try to login without entering an email login-steps3
    Then I should see an error message about the missing email login-steps3




