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
        userid INTEGER NOT NULL,
        overallScore INTEGER,
        numOfRatings INTEGER,
        averageScore REAL NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
        );
      SQL
      )
      database.execute(
        <<-SQL
        CREATE TABLE ratings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          rating_datetime DATETIME NOT NULL,
          againstTag VARCHAR(255) NOT NULL,
          object_id INTEGER NOT NULL,
          score INTEGER NOT NULL,
          userid INTEGER NOT NULL
          );
        SQL
        )  
        database.execute(
          <<-SQL
          CREATE TABLE tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tagName VARCHAR(255) NOT NULL,
            userid INTEGER NOT NULL,
            tag_datetime DATETIME NOT NULL,
            numOfObjects INTEGER NOT NULL
            );
          SQL
          )
          database.execute(
            <<-SQL
            CREATE TABLE tag_objects (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              objectId INTEGER NOT NULL,
              tagId INTEGER NOT NULL,
              tag_datetime DATETIME NOT NULL
              );
            SQL
            )
  end
  
end