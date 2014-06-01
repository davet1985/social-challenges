Given(/^I login to the website$/) do
  visit 'http://localhost:8000/#!/login'
  fill_in 'username', :with => 'cat_lover1990'
  fill_in 'password', :with => '12Password12'
  click_button('Sign in')
  page.should have_content('Upload')
end

Then(/^I upload a picture and tag it$/) do
  choose('Image')
  /sleep(2)/
  fill_in 'title', :with => 'Giggs - the hero'
  fill_in 'description', :with => 'Giggs is a legend. One of the greatest players ever.'
  attach_file('file', File.expand_path('features/support/giggs.jpeg'))
  find('input.input').set 'giggs,hero'
  click_button('Upload')
  sleep (2)
  page.should have_content('Upload another')
  page.should have_content('Giggs - the hero')
end

Then(/^I should see be able to see the picture within the tags section$/) do
  find('ul.image_tags').click_link('giggs')
  page.should have_content('Giggs - the hero')
  page.should have_content('Giggs is a legend. One of the greatest players ever')
  page.should have_content('Top 20 in giggs')
end