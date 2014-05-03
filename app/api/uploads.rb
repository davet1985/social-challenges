require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../model/upload'
require_relative './../repository/upload_repository'

module SocialChallenges

  class UploadAPI < Grape::API

    use Rack::JSONP
    format :json

    get :all do
      UploadRepository.all.to_json
    end

    get '/:id' do
      upload = UploadRepository.get_by_id(params[:id])
      if upload.nil? then
        error! 'Upload not found', 404
      else
        upload.to_json
      end
    end

    get '/:id/download' do
      upload = UploadRepository.get_by_id params[:id]
      if upload.nil? then
        error! 'Upload not found', 404
      else
        file_path = UploadRepository.get_file_path upload.file_name
        data = File.open(file_path, 'rb').read
        content_type upload.type
        env['api.format'] = :binary
        present data
      end
    end

    post '/add' do
      metadata_json = JSON.parse(params[:metadata])
      userid = metadata_json['userid']
      type = params[:image_file].type
      original_file_name = params[:image_file].filename
      file = params[:image_file]
      file_name = Time.now.strftime('%Y%m%d%H%M%S%L') + '_' + original_file_name
      upload = Upload.new type, file_name, original_file_name, userid
      UploadRepository.save upload
      UploadRepository.transfer_file file, file_name
    end

  end

end