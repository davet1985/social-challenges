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
        values (NULL, ?, ?, "inactive")
        SQL
      $db.execute(insert, username, Password.create(password))
      id = $db.last_insert_row_id()
        insertToken =  <<-SQL
          INSERT INTO user_token
          values (NULL, ?, datetime('now', '+30 minutes'), ?)
          SQL
      $db.execute(insertToken, id, SecureRandom.uuid)  
    end
    
    def self.activate(token)
      row = $db.get_first_row("select * from user_token where token = ? and expires > datetime('now')", token)
      update =  <<-SQL
        update users
        set status = "active"  
        where id = ?
        SQL
        $db.execute(update, row[1])
    end

    class << self
      
      include BCrypt

      def get(id)
        row = $db.get_first_row("select * from session where userid = ? and expires > datetime('now')", id)
        if row != nil
          $db.execute( "update session set expires= datetime('now', '+30 minutes')  where id = ?",  row[0])
          User.new(row[1], row[2])
        end
      end
      
      def authenticate(u, p)
        row = $db.get_first_row("select * from users where username = ? and status='active'", u)
        
        matchingPass = false
        matchingPass = Password.new(row[2]) == p if row != nil
        
        if matchingPass == true
          insert =  <<-SQL
          INSERT INTO session
          values (NULL, ? , ? , datetime('now', '+30 minutes'))
          SQL
          $db.execute(insert, row[0], u)
        end

        User.new(row[0], u) if row != nil && matchingPass
      end

    end

  end
end