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

### Running the tests

```
rake spec
```

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
