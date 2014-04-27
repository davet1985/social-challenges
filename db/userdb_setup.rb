$userdb = SQLite3::Database.new 'user.db'

module UserDB
  
  def self.setup(database)
    database.execute(
      <<-SQL
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
        );
      SQL
      )
  end
  
end