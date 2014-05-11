require 'json'
require_relative './../model/upload'

class Tag

  attr_reader :tagName, :userId

  def initialize(tagName, userId, id = nil)
    @tagName = tagName
    @userId = userId
    @id = id
  end
  
  def self.returnJSON(currentObject, previousObject, nextObject)
    [{
      "current"       => {"id" => currentObject.id, "type" => currentObject.type, "file_name" => currentObject.file_name, "file_name" => "http://localhost:9292/upload/#{currentObject.id}/download", "userid" => currentObject.userid, "upload_datetime" => currentObject.upload_datetime, "overallScore" => currentObject.overallScore, "numOfRatings" => currentObject.numOfRatings, "title" => currentObject.title, "description" => currentObject.description, "tags" => ""}, "previous" => {"id" => previousObject.id, "type" => previousObject.type, "rating" => (previousObject.overallScore.to_f / previousObject.numOfRatings.to_f).round(1), "file_name" => "http://localhost:9292/upload/#{previousObject.id}/download"}, "next" => {"id" => nextObject.id, "type" => nextObject.type, "rating" => nextObject.overallScore, "file_name" => "http://localhost:9292/upload/#{nextObject.id}/download"}
      }].to_json
  end
  
  def self.returnJSONNoPrevious(currentObject, nextObject)
    [{
      "current"       => {"id" => currentObject.id, "type" => currentObject.type, "file_name" => currentObject.file_name, "file_name" => "http://localhost:9292/upload/#{currentObject.id}/download", "userid" => currentObject.userid, "upload_datetime" => currentObject.upload_datetime, "overallScore" => currentObject.overallScore, "numOfRatings" => currentObject.numOfRatings, "title" => currentObject.title, "description" => currentObject.description, "tags" => ""}, "next" => {"id" => nextObject.id, "type" => nextObject.type, "rating" => nextObject.overallScore, "file_name" => "http://localhost:9292/upload/#{nextObject.id}/download"}
      }].to_json
  end

end
