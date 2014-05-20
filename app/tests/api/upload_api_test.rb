require 'minitest/autorun'
require 'rack/test'

OUTER_APP = Rack::Builder.parse_file('config.ru').first

describe SocialChallenges::UploadAPI do

  include Rack::Test::Methods

  let(:app) { OUTER_APP }

  describe "get uploads" do
    it "must get all uploads" do
      get '/upload/all'
      assert last_response.ok?
    end
    it "must get a single upload" do
      get '/upload/1'
      assert last_response.ok?
    end
  end

end