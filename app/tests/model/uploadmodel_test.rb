require 'minitest/autorun'

describe Uploadmodel do

  include FactoryGirl::Syntax::Methods

  let(:time_now) { Time.now.to_s }
  let(:tags) { [Tag.new('tag1', 1), Tag.new('tag2', 1), Tag.new('tag3', 1)] }
  let(:upload) { Uploadmodel.new('image/jpeg', 'file_name.jpg', 'original_file_name.jpg', 1, 'The title', 'The description', time_now) }
  before { upload.tags = tags }

  it { upload.must_respond_to :upload_datetime }
  it { upload.upload_datetime.must_equal time_now }
  it { upload.must_respond_to :type }
  it { upload.type.must_equal 'image/jpeg' }
  it { upload.must_respond_to :file_name }
  it { upload.file_name.must_equal 'file_name.jpg' }
  it { upload.must_respond_to :original_file_name }
  it { upload.original_file_name.must_equal 'original_file_name.jpg' }
  it { upload.must_respond_to :userid }
  it { upload.userid.must_equal 1 }
  it { upload.must_respond_to :title }
  it { upload.title.must_equal 'The title' }
  it { upload.must_respond_to :description }
  it { upload.description.must_equal 'The description' }

  describe "deserializing" do
    it "must deserialize to json" do
      upload.to_json.must_equal '{"id":null,"type":"image/jpeg","file_name":"http://localhost:9292/upload//download","userid":1,"upload_datetime":"'+time_now+'","averageScore":0.0,"numOfRatings":0,"title":"The title","description":"The description","tags":["tag1","tag2","tag3"]}'
    end
  end

end