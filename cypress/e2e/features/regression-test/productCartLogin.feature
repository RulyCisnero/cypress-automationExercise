@regression
Feature: Verificar persistencia del carrito luego del login

  Scenario: Buscar productos y verificar el carrito después de iniciar sesión
    Given I visit the homepage for regression-test
    When I click the 'Products' button
    Then I should see the All Products page

    When I search for "jeans"
    Then I should see search results

    When I add all search results to the cart
    And I go to the Cart page
    Then I should see at least one product in the cart

    When I click the 'Signup-Login' button
    And I register a new user
    And I go to the Cart page again
    Then I should still see the product-s in the cart
