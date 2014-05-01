$uploaddb = SQLite3::Database.new 'upload.db'

module UploadDB
  
  def self.setup(database)
    database.execute(
      <<-SQL
      CREATE TABLE uploads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        upload_datetime TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        original_file_name VARCHAR(255) NOT NULL,
        userid INTEGER NOT NULL
        );
      SQL
      )
  end
  
end