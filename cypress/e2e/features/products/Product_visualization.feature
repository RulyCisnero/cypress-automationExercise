@smoke
Feature: Product visualization

  Scenario: Verify all products and the product detail page
    Given I visit the main page
    When I click on the Products button -VFP
    Then I should be redirected to the All Products page
    And I should see the list of products
    When I click on 'View Product' of the first product
    Then I should be redirected to the Product Detail page
    And I should see the product details such as: name, category, price, availability, condition, and brand
    