require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../model/upload'
require_relative './../repository/leaderboard_repository'

module SocialChallenges

  class LeaderboardAPI < Grape::API

    use Rack::JSONP
    format :json

    get '/:tagName/:numberToGet' do
      JSON.parse(LeaderboardRepository.get_leaderboard_bytagname(params[:tagName], params[:numberToGet]).to_json)
    end

  end

end