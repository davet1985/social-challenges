require './app/api/version1'
require './app/api/login'
require './app/api/uploads'
require './app/api/rating'

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
