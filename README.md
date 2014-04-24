bundle install
rake db:create
rackup
curl -X POST "http://localhost:9292/add/insert_word"


