require './app/api/version1'
require './app/api/login'

run SocialChallenges::API
map '/auth' do
  run SocialChallenges::LOGINAPI
end