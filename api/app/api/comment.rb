require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../repository/comment_repository'

module SocialChallenges

  class CommentAPI < Grape::API

    use Rack::JSONP
    format :json

    post '/add' do
      userid = params[:userId]
      objectId = params[:objectId]
      comment = params[:comment]
      CommentRepository.save objectId, comment, userid
      JSON.parse(CommentRepository.find_by_object_id(params[:objectId]).to_json)
    end
    
    get '/delete/:id' do
      id = params[:id]
      CommentRepository.delete id
    end

  end

end