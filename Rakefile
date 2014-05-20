require 'sqlite3'
require 'grape'
require 'rspec/core/rake_task'

require_relative 'config/application.rb'

namespace :db do

  desc "Create the database"
  task :create do
    puts "Creating the hashbang database..."
    HashBangDB.setup($hashbang_db)
    HashBangDB.seed(Parser.parse('db/uploads.csv', Uploadmodel), $hashbang_db)
  end

  desc "Drop the databases"
  task :drop do
    puts "Deleting the database..."
    rm_f 'hashbang.db'
  end

  desc 'Prepare testing database'
  task :testprep do
    puts "Deleting old test db... if it exits"
    rm_f 'hashbang_test.db'
    puts "Creating test db... "
    HashBangDB.setup(SQLite3::Database.new('hashbang_test.db'))
    puts "Seeding database..."
    HashBangDB.seed(Parser.parse('db/uploads.csv', Uploadmodel), SQLite3::Database.new('hashbang_test.db'))
    puts "Done"
  end

end

desc "Task description"
task :task_name => [:dependent, :tasks] do
  
end

desc "Run the specs"
task :spec do
  Rake::Task['db:testprep'].invoke
  RSpec::Core::RakeTask.new(:spec)
end











