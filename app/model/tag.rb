require 'json'

class Tag

  attr_reader :tagName, :userId, :id

  def initialize(tagName, userId, id = nil)
    @tagName = tagName
    @userId = userId
    @id = id
  end

  def to_json(*a)
    @tagName.to_json(*a)
  end
  
  def self.returnJSON(currentObject, previousObject, nextObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "previous" => {"id" => previousObject.id, "type" => previousObject.type, "overallScore" => previousObject.overallScore, "file_name" => "http://localhost:9292/upload/#{previousObject.id}/download"}, "next" => {"id" => nextObject.id, "type" => nextObject.type, "overallScore" => nextObject.overallScore, "file_name" => "http://localhost:9292/upload/#{nextObject.id}/download"}
      }].to_json
  end
  
  def self.returnJSONNoNext(currentObject, previousObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "previous" => {"id" => previousObject.id, "type" => previousObject.type, "overallScore" => previousObject.overallScore, "file_name" => "http://localhost:9292/upload/#{previousObject.id}/download"}
      }].to_json
  end
  
  def self.returnJSONNoPrevious(currentObject, nextObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "next" => {"id" => nextObject.id, "type" => nextObject.type, "overallScore" => nextObject.overallScore, "file_name" => "http://localhost:9292/upload/#{nextObject.id}/download"}
      }].to_json
  end
  
  def self.returnJSONNoPreviousNoNext(currentObject)
    [{
      "current"       => JSON.parse(currentObject.to_json)
      }].to_json
  end

end
