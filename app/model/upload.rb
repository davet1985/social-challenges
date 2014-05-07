require 'json'

class Upload

  attr_reader :upload_datetime, :type, :file_name, :original_file_name, :userid, :title, :description, :overallScore, :numOfRatings, :id

  def initialize(type, file_name, original_file_name, userid, title, description, upload_datetime = Time.now.to_s, id = nil, overallScore = 0, numOfRatings = 0)
    @type = type
    @file_name = file_name
    @original_file_name = original_file_name
    @userid = userid
    @upload_datetime = upload_datetime
    @id = id
    @overallScore = overallScore
    @numOfRatings = numOfRatings
    @title = title
    @description = description
  end

  def to_json(*a)
    [{
      "current"       => {"id" => @id, "type" => @type, "file_name" => @file_name, "file_name" => "http://localhost:9292/upload/#{@id}/download", "userid" => @userid, "upload_datetime" => @upload_datetime, "overallScore" => @overallScore, "numOfRatings" => @numOfRatings, "title" => @title, "description" => @description, "tags" => ""}, "previous" => {"id" => "1", "type" => "image", "rating" => 4, "file_name" => "public/img/cat2.jpg"}, "next" => {"id" => "3", "type" => "image", "rating" => 3, "file_name" => "public/img/cat3.jpg"}
      }].to_json(*a)
  end

end
