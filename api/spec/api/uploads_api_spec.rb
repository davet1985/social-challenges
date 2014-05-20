require 'spec_helper'

$db = SQLite3::Database.open 'hashbang_test.db'
OUTER_APP = Rack::Builder.parse_file('config.ru').first

describe SocialChallenges::UploadAPI, :type => :feature do

  include Rack::Test::Methods

  let(:app) { OUTER_APP }

  describe "valid API endpoints" do
    it "should get all uploads" do
      get '/upload/all'
      last_response.status.should == 200
      last_response.body.should eq "\"[{\\\"id\\\":1,\\\"type\\\":\\\"image/jpeg\\\",\\\"file_name\\\":\\\"http://localhost:9292/upload/1/download\\\",\\\"userid\\\":1,\\\"upload_datetime\\\":\\\"2014-05-20 22:21:43 +0100\\\",\\\"overallScore\\\":2,\\\"numOfRatings\\\":3,\\\"title\\\":\\\"The title\\\",\\\"description\\\":\\\"The description\\\",\\\"tags\\\":[]}]\""
    end
    it "should get a single upload" do
      get '/upload/1'
      last_response.status.should == 200
      last_response.body.should eq "{\"id\":1,\"type\":\"image/jpeg\",\"file_name\":\"http://localhost:9292/upload/1/download\",\"userid\":1,\"upload_datetime\":\"2014-05-20 22:21:43 +0100\",\"overallScore\":2,\"numOfRatings\":3,\"title\":\"The title\",\"description\":\"The description\",\"tags\":[]}"
    end
    it "should return a 404" do
      get '/upload/999'
      last_response.status.should == 404
    end
  end

end