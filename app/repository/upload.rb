require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter => "sqlite3",
  database: 'upload.db'
)

class Upload < ActiveRecord::Base
  # disable STI
    self.inheritance_column = :_type_disabled
  
end