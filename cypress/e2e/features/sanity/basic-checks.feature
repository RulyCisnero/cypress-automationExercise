@sanity
Feature: Verificaciones rápidas de funciones clave

  Scenario: El login funciona
    Given I visit the home page sanity-steps 
    When I click the 'Register-Login' button sanity-steps
    And I fill valid login credentials sanity-steps
    Then I should see the user logged in sanity-steps

  Scenario: Se puede agregar un producto al carrito
    Given I visit the home page sanity-steps
    When I navigate to the products page sanity-steps
    And I add a product to the cart
    Then I should see the product in the cart
 