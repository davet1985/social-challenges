require 'capybara/cucumber'
require 'selenium-webdriver'
require 'capybara/poltergeist'

Capybara.default_driver    = :poltergeist
Capybara.javascript_driver=:poltergeist