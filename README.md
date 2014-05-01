#API setup

```
sudo ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install
rake db:create
rake db:usercreate
rake db:uploadcreate
rackup
```

*OR*

To run the API in development mode with reloading enabled, use shotgun: -

```
sudo gem install shotgun #don't add this to the Gemfile
shotgun config.ru
```

Then browse to http://localhost:9393

##Perform a post

```
curl -X POST "http://localhost:9292/add/foobar" -d ''
```

## Posting a file upload

```
curl -X POST --form image_file=@/path/to/image.jpg http://localhost:9393/upload/add
```

#Front end

```
cd frontend
bundle install
npm install
grunt
node server.js
```

Browse at http://localhost:8000/
