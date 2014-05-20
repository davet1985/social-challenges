require 'sqlite3'

require_relative './../helpers/upload_model_helper'

$db = SQLite3::Database.open 'hashbang.db'

class UploadRepository

  @@upload_dir = 'uploads'

  def self.all
    results = $db.execute("select * from uploads")
    UploadModelHelper.cast_upload_results results
  end

  def self.get_by_id(id)
    select =  <<-SQL
      SELECT *
      FROM uploads
      WHERE id = ?
      SQL
    results = $db.execute(select, id)
    uploads = UploadModelHelper.cast_upload_results results
    if uploads.count == 1
      uploads[0]
    else
      false
    end
  end

  def self.save(upload)
    insert =  <<-SQL
      INSERT INTO uploads
      values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      SQL
    $db.execute(insert, upload.upload_datetime, upload.type, upload.file_name, upload.original_file_name, upload.userid, upload.overallScore, upload.numOfRatings, upload.averageScore , upload.title, upload.description)
    upload_id = $db.last_insert_row_id()
  end

  def self.transfer_file(file, file_name)
    FileUtils.cp(file.tempfile.path, self.get_file_path(file_name))
  end

  def self.get_file_path(file_name)
    "#{@@upload_dir}/#{file_name}"
  end

end
