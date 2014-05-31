require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../model/tag'
require_relative './../repository/tag_repository'
require_relative './../repository/tag_upload_repository'
require_relative './../helpers/tag_helper'
require_relative './../helpers/tag_cloud'

module SocialChallenges

  class TagAPI < Grape::API

    use Rack::JSONP
    format :json
    
    get :all do
      JSON.parse(TagCloud.tag_cloud(TagRepository.all))
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
    
    post '/:tagName/:currentId/:previousId' do
      
      idstoignore = params[:ignoreIds]
      if params[:ignoreIds] == "" then
        idstoignore = Array[-1]
      else
        idstoignore = params[:ignoreIds].split(',').map { |s| s.to_i }
      end
      currentObject = UploadRepository.get_by_id params[:currentId]
      idstoignore.push(currentObject.id)
      previousObject = UploadRepository.get_by_id params[:previousId]
      idstoignore.push(previousObject.id)
      nextObject = TagUploadRepository.get_random_object_bytagname params[:tagName], idstoignore
      if !currentObject then
        error! 'Upload not found', 404
      else
        if nextObject == false then
          JSON.parse(Tag.returnJSONNoNext(currentObject, previousObject))  
        else
          JSON.parse(Tag.returnJSON(currentObject, previousObject, nextObject))
        end
      end
    end
    
    
    post '/:tagName' do
      puts '***********'
      
      idstoignore = params[:ignoreIds]
      if params[:ignoreIds] == "" then
        idstoignore = Array[-1]
      else
        idstoignore = params[:ignoreIds].split(',').map { |s| s.to_i }
      end
      
      currentObject = TagUploadRepository.get_random_object_bytagname params[:tagName], idstoignore
      idstoignore.push(currentObject.id) 
      nextObject = TagUploadRepository.get_random_object_bytagname params[:tagName], idstoignore
      if !currentObject then
        error! 'Upload not found', 404
      else
        if nextObject == false then
          JSON.parse(Tag.returnJSONNoPreviousNoNext(currentObject))  
        else
          JSON.parse(Tag.returnJSONNoPrevious(currentObject, nextObject))
        end
      end
    end

  end

end