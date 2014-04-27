require 'bcrypt'

$db = SQLite3::Database.open './user.db'

module GrapeWarden
  class User
    
    /USERS =/ 
    
    include BCrypt

    attr_reader :name
    attr_reader :id
    
    def initialize(id, name)
      @id = id
      @name = name
    end
    
    def self.save(username, password)
      insert =  <<-SQL
        INSERT INTO users
        values (NULL, ?, ?)
        SQL
        $db.execute(insert, username, Password.create(password))
    end

    class << self
      
      include BCrypt

      def get(id)
        row = $db.get_first_row("select * from session where userid = ?", id)
        User.new(row[1], row[2])
      end
      
      def authenticate(u, p)
        row = $db.get_first_row("select * from users where username = ?", u)
        
        if row != nil
          insert =  <<-SQL
          INSERT INTO session
          values (NULL, ? , ? , datetime('now', '+30 minutes'))
          SQL
          $db.execute(insert, row[0], u)
        end
        matchingPass = false
        matchingPass = Password.new(row[2]) == p if row != nil
        User.new(row[0], u) if row != nil && matchingPass
      end

    end

  end
end