@smoke
Feature: Test Cases Page Navigation

  Scenario: User navigates to the Test Cases page successfully
    Given I visit the homepage fot testcase
    When I click on the Test Cases button
    Then I should be navigated to the Test Cases page successfully
