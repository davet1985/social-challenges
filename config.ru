require './app/api/version1'
require './app/api/login'
require './app/api/uploads'
require './app/api/rating'
require './app/api/tag'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :get
  end
end

run SocialChallenges::API

map '/auth' do
  run SocialChallenges::LOGINAPI
end

map '/upload' do
  run SocialChallenges::UploadAPI
end

map '/rating' do
  run SocialChallenges::RatingAPI
end

map '/tag' do
  run SocialChallenges::TagAPI
end
