#API setup

```
sudo ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install
rake db:create
rackup
```
Then browse to http://localhost:9292

*OR*

To run the API in development mode with reloading enabled, use shotgun: -

```
sudo gem install shotgun #don't add this to the Gemfile
shotgun config.ru
```

Then browse to http://localhost:9393

## Uploads API

### Posting a file upload

This is a multipart form post, one part sends the metadata in JSON and the other part sends the file.

```
curl -X POST -F 'metadata={"userid": 1}' -F "image_file=@/Users/davidt/dev/social-challenges/frontend/assets/img/cat1.jpg" http://localhost:9393/upload/add
```

### Getting file uploads

Get endpoints for uploads API are as follows: -

* http://localhost:9393/upload/add
* http://localhost:9393/upload/all
* http://localhost:9393/upload/[id]
* http://localhost:9393/upload/[id]/download

## User creation
* cd to api and run a bundle install (sudo ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install)
* type mailcatcher in cmd to run the mailcatcher daemon.
* Navigate to http://localhost:1080/ on the browser
* Go to the signup page and create a user (hint: you can use the password: myPass145)
* You should receive an email in mailcatcher, open the email and copy the activation link into the browser
* You should now be able to log in with your new user



### Running the tests

```
# to run all tests
rake spec
# to use guard to watch for changes and run tests for you
bundle exec guard
```

### RMagick

```
cd api/app/api
brew install pkgconfig
brew install imagemagick
brew link imagemagick
bundle install
ruby resize.rb
```

It shoud create 3 sizes:

* api/spec/upoads/resize_large.jpg
* api/spec/upoads/resize_medium.jpg
* api/spec/upoads/resize_thumb.jpg

#Front end

```
cd frontend
bundle install
npm install
npm install -g grunt-cli
grunt
npm start
```

Browse at http://localhost:8000
