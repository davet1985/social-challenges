require 'grape'
require 'sqlite3'
require 'json'
require 'rack/contrib'

require_relative './../model/upload'

module SocialChallenges

  class UploadAPI < Grape::API

    use Rack::JSONP
    format :json

    get :all do
      Upload.all
    end

    get '/:id' do
      Upload.get_by_id params[:id]
    end

    post '/add' do
      metadata_json = JSON.parse(params[:metadata])
      userid = metadata_json['userid']
      type = params[:image_file].type
      original_file_name = params[:image_file].filename
      file_name = Time.now.strftime('%Y%m%d%H%M%S%L') + '_' + original_file_name
      FileUtils.cp(params[:image_file].tempfile.path, "uploads/#{file_name}")
      upload = Upload.new type, file_name, original_file_name, userid
      upload.save
    end

  end

end