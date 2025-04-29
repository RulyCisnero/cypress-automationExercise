@sanity
Feature: Product search

  Scenario Outline: Search for different products by name
    Given  I visit the main page -BP
    When I click on the Products button -BP
    And I enter "<product>" in the search field
    And I click on the search button
    Then I should see the searched product titles
    Then the products related to "<product>" should be displayed
 
    Examples:
      | product      |
      | Polo         |
      | Blue Top     |
      | Men Tshirt   |
      | Winter Top   |