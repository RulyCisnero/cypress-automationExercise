@smoke
Feature: Verificaciones básicas del home

  Scenario: Se visualiza correctamente el banner principal
    Given I visit the home page
    Then I should see the main banner

  Scenario: El usuario puede suscribirse al newsletter
    Given I visit the home page
    When I write a valid email
    And I click the subscribe button
    Then I should see the success subscription message

  Scenario: El login se muestra correctamente
    Given I visit the home page
    When I click the 'Register-Login' button
    Then I should see the login-signup form
