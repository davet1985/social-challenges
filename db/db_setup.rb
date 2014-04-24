$db = SQLite3::Database.new 'word.db'

module WordDB
  
  def self.setup(database)
    database.execute(
      <<-SQL
      CREATE TABLE words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text VARCHAR(50) NOT NULL
        );
      SQL
      )
  end
  
end