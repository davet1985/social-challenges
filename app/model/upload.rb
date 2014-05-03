require 'json'

class Upload

  attr_reader :upload_datetime, :type, :file_name, :original_file_name, :userid

  def initialize(type, file_name, original_file_name, userid, upload_datetime = Time.now.to_s, id = nil)
    @type = type
    @file_name = file_name
    @original_file_name = original_file_name
    @userid = userid
    @upload_datetime = upload_datetime
    @id = id
  end

  def to_json(*a)
    {
      "json_class" => self.class.name,
      "data"       => {"id" => @id, "type" => @type, "file_name" => @file_name, "file_name" => @original_file_name, "userid" => @userid, "upload_datetime" => @upload_datetime }
    }.to_json(*a)
  end

end
