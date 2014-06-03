require 'json'
require 'digest/md5'

class Uploadmodel

  attr_accessor :tags
  attr_reader :upload_datetime, :type, :file_name, :original_file_name, :userid, :title, :description, :overallScore, :numOfRatings, :averageScore, :id, :gravatar

  def initialize(type, file_name, original_file_name, userid, title, description, upload_datetime = Time.now.to_s, id = nil, overallScore = 0, numOfRatings = 0, averageScore = 0, gravatar = "")
    @type = type
    @file_name = file_name
    @original_file_name = original_file_name
    @userid = userid
    @title = title
    @description = description
    @upload_datetime = upload_datetime
    @id = id
    @overallScore = overallScore
    @numOfRatings = numOfRatings
    @averageScore = averageScore
    @gravatar = gravatar
  end

  def to_json(*a)
    md5gravatar = Digest::MD5.hexdigest(@gravatar)
    {"id" => @id, "type" => @type, "file_name" => @file_name, "original_file_name" => @original_file_name, "file_name" => "http://localhost:9292/upload/#{@id}/download", "userid" => @userid, "upload_datetime" => @upload_datetime, "overallScore" => @overallScore, "numOfRatings" => @numOfRatings, "title" => @title, "description" => @description, "tags" => JSON.parse(@tags.to_json), "gravatar" => md5gravatar}.to_json(*a)
  end

end
