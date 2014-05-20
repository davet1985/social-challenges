require 'spec_helper'

describe Uploadmodel do

  let(:time_now) { Time.now.to_s }
  let(:tags) { [Tag.new('tag1', 1), Tag.new('tag2', 1), Tag.new('tag3', 1)] }
  let(:upload) { Uploadmodel.new('image/jpeg', 'file_name.jpg', 'original_file_name.jpg', 1, 'The title', 'The description', time_now) }
  before { upload.tags = tags }

  it { upload.should respond_to :upload_datetime }
  it { upload.upload_datetime.should eq time_now }
  it { upload.should respond_to :type }
  it { upload.type.should eq 'image/jpeg' }
  it { upload.should respond_to :file_name }
  it { upload.file_name.should eq 'file_name.jpg' }
  it { upload.should respond_to :original_file_name }
  it { upload.original_file_name.should eq 'original_file_name.jpg' }
  it { upload.should respond_to :userid }
  it { upload.userid.should eq 1 }
  it { upload.should respond_to :title }
  it { upload.title.should eq 'The title' }
  it { upload.should respond_to :description }
  it { upload.description.should eq 'The description' }

  describe "deserializing" do
    it "must deserialize to json" do
      upload.to_json.should eq '{"id":null,"type":"image/jpeg","file_name":"http://localhost:9292/upload//download","userid":1,"upload_datetime":"'+time_now+'","overallScore":0,"numOfRatings":0,"title":"The title","description":"The description","tags":["tag1","tag2","tag3"]}'
    end
  end

end