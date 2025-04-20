Feature: Contact Us Form

  Scenario: User submits the contact us form successfully
    Given I visit the homepage Automation
    When I click on the Contact Us button
    And I verify that the contact form is visible
    And I fill out the contact form with valid information
    And I submit the form and accept the alert
    Then I should see a success message confirming the form submission
    And I click the Home button and verify that I am redirected to the homepage