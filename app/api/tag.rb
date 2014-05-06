require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../model/tag'
require_relative './../repository/tag_repository'

module SocialChallenges

  class TagAPI < Grape::API

    use Rack::JSONP
    format :json
    
    get :all do
      TagRepository.all.to_json
    end

    post '/add' do      
      tagName = params[:tagName]
      userid = params[:userId]
      tag = Tag.new tagName, userid
      TagRepository.save tag
    end
    
    post '/add/:objectId' do      
      objectId = params[:objectId]
      tags = params[:tags]
      userid = params[:userId]
      
      tagArray = tags.split(" ")
      tagArray.each { |tag| 
        tagId = Tag.findTagOrAddIfNotFound(tag, userid)
        TagRepository.tagObject objectId, tagId
      }
    end
    
    get '/:id' do
      objects = TagRepository.get_objects_tagid(params[:id])
      if !objects then
        error! 'Upload not found', 404
      else
        objects.to_json
      end
    end

  end

end