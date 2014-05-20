require 'sqlite3'
require 'grape'
require 'rake/testtask'

require_relative './db/hashbang_db_setup'

desc "Runs all tests"
Rake::TestTask.new do |t|
  t.libs << "app"
  t.test_files = FileList['app/tests/*/*_test.rb']
  t.verbose = false
end

namespace :db do

  desc "Create the database"
  task :create do
    puts "Creating the hashbang database..."
    HashBangDB.setup($hashbang_db)
  end
  
  # desc "Creates the users database"
  # task :usercreate do
  #   puts "Creating users database..."
  #   UserDB.setup($userdb)
  # end
  
  # desc "Creates the uploads database"
  # task :uploadcreate do
  #   puts "Creating uploads database..."
  #   UploadDB.setup($uploaddb)
  # end

end
