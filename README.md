#API setup

bundle install

rake db:create

rackup

*OR*


To run the API in development mode with reloading enabled, use shotgun: -

```
sudo gem install shotgun #don't add this to the Gemfile
shotgun config.ru
```

Then browse to http://localhost:9393

##Perform a post

curl -X POST "http://localhost:9292/add/foobar"  -d ''


#Front end

gem install bootstrap-sass

npm install grunt-contrib-jasmine --save-dev

grunt