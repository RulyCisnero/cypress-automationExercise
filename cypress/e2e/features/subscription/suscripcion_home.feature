Feature: Verify subscription on the homepage

  Scenario: The user subscribes from the homepage footer
    Given I visit the homepage for subscription
    When I scroll down to the footer
    Then I should see the text 'SUBSCRIPTION'
    When I enter an email and click the subscribe button
    Then I should see the success message 'You have been successfully subscribed!'
