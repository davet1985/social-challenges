require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../model/tag'
require_relative './../repository/tag_repository'
require_relative './../helpers/tag_helper'

module SocialChallenges

  class TagAPI < Grape::API

    use Rack::JSONP
    format :json
    
    get :all do
      JSON.parse(TagRepository.all.to_json)
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
        tagId = TagHelper.find_or_add_tag(tag, userid)
        TagRepository.tagObject objectId, tagId
      }
    end
    
    get '/:tagName/:currentId/:previousId' do
      currentObject = UploadRepository.get_by_id params[:currentId]
      previousObject = UploadRepository.get_by_id params[:previousId]
      nextObject = TagRepository.get_random_object_bytagname params[:tagName]
      if !currentObject then
        error! 'Upload not found', 404
      else
        JSON.parse(Tag.returnJSON(currentObject, previousObject, nextObject))
      end
    end
    
    get '/:tagName' do
      currentObject = TagRepository.get_random_object_bytagname params[:tagName]
      nextObject = TagRepository.get_random_object_bytagname params[:tagName]
      if !currentObject then
        error! 'Upload not found', 404
      else
        JSON.parse(Tag.returnJSONNoPrevious(currentObject, nextObject))
      end
    end

  end

end