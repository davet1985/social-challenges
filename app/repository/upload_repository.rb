require 'sqlite3'

require_relative './../model/uploadmodel'
require_relative './../helpers/upload_model_helper'

$uploaddb = SQLite3::Database.open 'upload.db'

class UploadRepository

  @@upload_dir = 'uploads'

  def self.all
    results = $uploaddb.execute("select * from uploads")
    UploadModelHelper.cast_upload_results results
  end

  def self.get_by_id(id)
    select =  <<-SQL
      SELECT *
      FROM uploads
      WHERE id = ?
      SQL
    results = $uploaddb.execute(select, id)
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
    $uploaddb.execute(insert, upload.upload_datetime, upload.type, upload.file_name, upload.original_file_name, upload.userid, upload.overallScore, upload.numOfRatings, upload.averageScore , upload.title, upload.description)
    upload_id = $uploaddb.last_insert_row_id()
  end

  def self.transfer_file(file, file_name)
    FileUtils.cp(file.tempfile.path, self.get_file_path(file_name))
  end

  def self.get_file_path(file_name)
    "#{@@upload_dir}/#{file_name}"
  end

end
