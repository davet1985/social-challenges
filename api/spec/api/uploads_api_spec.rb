require 'spec_helper'

$db = SQLite3::Database.open 'hashbang_test.db'
$upload_dir = 'spec/uploads'

OUTER_APP = Rack::Builder.parse_file('config.ru').first

describe SocialChallenges::UploadAPI, :type => :feature do

  include Rack::Test::Methods

  let(:app) { OUTER_APP }

  describe "API endpoints" do
    it "should get all uploads" do
      get '/upload/all'
      last_response.status.should == 200
      last_response.body.should eq "[{\"id\":1,\"type\":\"image/jpeg\",\"file_name\":\"http://localhost:9292/upload/1/download\",\"userid\":\"a@b.com\",\"upload_datetime\":\"2014-05-20 22:21:43 +0100\",\"overallScore\":2,\"numOfRatings\":3,\"title\":\"The amazing cat\",\"description\":\"This can is amazing\",\"tags\":[\"tag1\",\"tag2\",\"tag3\"]},{\"id\":2,\"type\":\"image/jpeg\",\"file_name\":\"http://localhost:9292/upload/2/download\",\"userid\":\"a@b.com\",\"upload_datetime\":\"2014-05-20 22:21:43 +0100\",\"overallScore\":4,\"numOfRatings\":2,\"title\":\"The stinking dog\",\"description\":\"This dog smells!\",\"tags\":[]}]"
    end
    it "should get a single upload" do
      get '/upload/1'
      last_response.status.should == 200
      last_response.body.should eq "{\"id\":1,\"type\":\"image/jpeg\",\"file_name\":\"http://localhost:9292/upload/1/download\",\"userid\":\"a@b.com\",\"upload_datetime\":\"2014-05-20 22:21:43 +0100\",\"overallScore\":2,\"numOfRatings\":3,\"title\":\"The amazing cat\",\"description\":\"This can is amazing\",\"tags\":[\"tag1\",\"tag2\",\"tag3\"]}"
    end
    it "should get a single uploaded file" do
      get '/upload/1/download'
      last_response.status.should == 200
      last_response["Content-type"].should eq "image/jpeg"
    end
    it "should return a 404" do
      get '/upload/999'
      last_response.status.should == 404
    end
  end

end