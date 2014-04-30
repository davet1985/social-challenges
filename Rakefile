require 'sqlite3'
require 'grape'

require_relative './db/db_setup'
require_relative './db/userdb_setup'
require_relative './db/uploaddb_setup'

namespace :db do

  desc "Creates the words database"
  task :create do
    puts "Creating words database..."
    WordDB.setup($worddb)
  end
  
  desc "Creates the users database"
  task :usercreate do
    puts "Creating users database..."
    UserDB.setup($userdb)
  end
  
  desc "Creates the uploads database"
  task :uploadcreate do
    puts "Creating uploads database..."
    UploadDB.setup($uploaddb)
  end

end
