Feature: Login and upload a picture
 
Scenario: Login and upload a picture        
    Given I login to the website
    When I upload a picture and tag it
    Then I should see be able to see the picture within the tags section
	
Scenario: Rate a picture
	Given I check the current score of the picture
	When I like the picture
	Then the picture total likes should have increased