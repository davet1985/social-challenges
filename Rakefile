require 'sqlite3'
require 'grape'

require_relative './db/db_setup'

namespace :db do

  desc "Creates the database"
  task :create do
    puts "Creating database..."
    WordDB.setup($db)
  end

end
