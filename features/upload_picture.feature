Feature: Login and upload a picture
 
Scenario: Login and upload a picture        
    Given I login to the website
    Then I upload a picture and tag it
    Then I should see be able to see the picture within the tags section