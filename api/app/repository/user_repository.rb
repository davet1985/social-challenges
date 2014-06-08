require 'sqlite3'

$db = SQLite3::Database.open 'hashbang.db'

class UserRepository

  def self.getUsername(id)
    select =  <<-SQL
      select username from users
      where id = ?
      SQL
    row = $db.get_first_row(select, id)
    row[0]
  end

end