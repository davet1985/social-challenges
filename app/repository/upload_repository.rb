require 'sqlite3'

require_relative './../model/upload'

$uploaddb = SQLite3::Database.open 'upload.db'

class UploadRepository

  @@upload_dir = 'uploads'

  def self.all
    results = $uploaddb.execute("select * from uploads")
    cast results
  end

  def self.get_by_id(id)
    select =  <<-SQL
      SELECT *
      FROM uploads
      WHERE id = ?
      SQL
    results = $uploaddb.execute(select, id)
    uploads = self.cast results
    if uploads.count == 1
      uploads[0]
    else
      false
    end
  end

  def self.cast(results)
    uploads = Array.new
    results.each { |r| uploads << Upload.new(r[2], r[3], r[4], r[5], r[8], r[9], r[1], r[0], r[6], r[7]) }
    uploads
  end

  def self.save(upload)
    insert =  <<-SQL
      INSERT INTO uploads
      values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      SQL
    $uploaddb.execute(insert, upload.upload_datetime, upload.type, upload.file_name, upload.original_file_name, upload.userid, upload.overallScore, upload.numOfRatings, upload.title, upload.description)
    upload_id = $uploaddb.last_insert_row_id()
  end

  def self.transfer_file(file, file_name)
    FileUtils.cp(file.tempfile.path, self.get_file_path(file_name))
  end

  def self.get_file_path(file_name)
    "#{@@upload_dir}/#{file_name}"
  end

end
