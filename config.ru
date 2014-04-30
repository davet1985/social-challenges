require './app/api/version1'
require './app/api/login'
require './app/api/uploads'

run SocialChallenges::API

map '/auth' do
  run SocialChallenges::LOGINAPI
end

map '/upload' do
  run SocialChallenges::UploadAPI
end
