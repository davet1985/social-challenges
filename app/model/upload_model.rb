require 'json'
require_relative './../model/tag'

class UploadModel

  @tags = Array.new

  attr_reader :upload_datetime, :type, :file_name, :original_file_name, :userid, :title, :description, :overallScore, :numOfRatings, :averageScore, :id

  def initialize(type, file_name, original_file_name, userid, title, description, upload_datetime = Time.now.to_s, id = nil, overallScore = 0, numOfRatings = 0, averageScore = 0)
    @type = type
    @file_name = file_name
    @original_file_name = original_file_name
    @userid = userid
    @upload_datetime = upload_datetime
    @id = id
    @overallScore = overallScore
    @numOfRatings = numOfRatings
    @averageScore = averageScore
    @title = title
    @description = description
  end

  def to_json(*a)
    {"id" => @id, "type" => @type, "file_name" => @file_name, "file_name" => "http://localhost:9292/upload/#{@id}/download", "userid" => @userid, "upload_datetime" => @upload_datetime, "averageScore" => @averageScore.round(1), "numOfRatings" => @numOfRatings, "title" => @title, "description" => @description, "tags" => JSON.parse(@tags.to_json)}.to_json(*a)
  end

  def set_tags(tags)
    @tags = tags
  end
  
  def self.cast(results)
    uploads = Array.new
    results.each { |r| uploads << upload = UploadModel.new(r[2], r[3], r[4], r[5], r[9], r[10], r[1], r[0], r[6], r[7], r[8]) 
                                  upload.set_tags TagRepository.find_by_object_id(upload.id)
                                  upload }
    uploads
  end
  
  def self.cast_upload(results)
    uploads = Array.new
    results.each { |r| uploads << upload = UploadModel.new(r.type, r.file_name, r.original_file_name, r.userid, r.title, r.description, r.upload_datetime, r.id, r.overallScore, r.numOfRatings, r.averageScore) 
                                  upload.set_tags TagRepository.find_by_object_id(upload.id)
                                  upload }
    uploads
  end

end
