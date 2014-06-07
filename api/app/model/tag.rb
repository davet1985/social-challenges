require 'json'

class Tag

  attr_reader :tagName, :userId, :id, :tag_datetime, :numOfObjects

  def initialize(tagName, userId, id = nil, tag_datetime = Time.now.to_s, numOfObjects = 0)
    @tagName = tagName
    @userId = userId
    @id = id
    @tag_datetime = tag_datetime
    @numOfObjects = numOfObjects
  end

  def to_json(*a)
    @tagName.to_json(*a)
  end
  
  def self.returnJSON(currentObject, previousObject, nextObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "previous" => {"id" => previousObject.id, "original_file_name" => previousObject.original_file_name, "type" => previousObject.type, "overallScore" => previousObject.overallScore, "file_name_medium" => "http://localhost:9292/upload/#{previousObject.id}/download/medium", "file_name" => "http://localhost:9292/upload/#{previousObject.id}/download"}, "next" => {"id" => nextObject.id, "original_file_name" => nextObject.original_file_name,  "type" => nextObject.type, "file_name_medium" => "http://localhost:9292/upload/#{nextObject.id}/download/medium", "overallScore" => nextObject.overallScore, "file_name" => "http://localhost:9292/upload/#{nextObject.id}/download"}
      }].to_json
  end
  
  def self.returnJSONNoNext(currentObject, previousObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "previous" => {"id" => previousObject.id, "type" => previousObject.type, "overallScore" => previousObject.overallScore, "file_name" => "http://localhost:9292/upload/#{previousObject.id}/download","file_name_medium" => "http://localhost:9292/upload/#{previousObject.id}/download/medium", "original_file_name" => previousObject.original_file_name}, "next" => {"type" => 'end'}
      }].to_json
  end
  
  def self.returnJSONNoPrevious(currentObject, nextObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "next" => {"id" => nextObject.id, "type" => nextObject.type, "overallScore" => nextObject.overallScore, "file_name" => "http://localhost:9292/upload/#{nextObject.id}/download", "file_name_medium" => "http://localhost:9292/upload/#{nextObject.id}/download/medium", "original_file_name" => nextObject.original_file_name}
      }].to_json
  end
  
  def self.returnJSONNoPreviousNoNext(currentObject)
    [{
      "current"       => JSON.parse(currentObject.to_json), "next" => {"type" => 'end'}
      }].to_json
  end

end
