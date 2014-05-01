require 'sqlite3'

$uploaddb = SQLite3::Database.open 'upload.db'

class Upload

  attr_reader :upload_datetime, :type, :file_name, :original_file_name, :userid

  def initialize(type, file_name, original_file_name, userid, upload_datetime = Time.now.to_s)
    @type = type
    @file_name = file_name
    @original_file_name = original_file_name
    @userid = userid
    @upload_datetime = upload_datetime
  end

  def self.all
    sorted = $uploaddb.execute("select * from uploads")
  end

  def self.get_by_id(id)
    select =  <<-SQL
      SELECT *
      FROM uploads
      WHERE id = ?
      SQL
    result = $uploaddb.execute(select, id)
  end

  def save
    insert =  <<-SQL
      INSERT INTO uploads
      values (NULL, ?, ?, ?, ?, ?)
      SQL
      $uploaddb.execute(insert, self.upload_datetime, self.type, self.file_name, self.original_file_name, self.userid)
  end

end
