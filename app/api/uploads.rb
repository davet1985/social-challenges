require 'grape'
require 'json'
require 'rack/contrib'

require_relative './../model/uploadmodel'
require_relative './../repository/upload_repository'
require_relative './../repository/tag_repository'
require_relative './../helpers/tag_helper'
require_relative './../model/error'

module SocialChallenges

  class UploadAPI < Grape::API

    use Rack::JSONP
    format :json

    get :all do
      UploadRepository.all.to_json
    end

    get '/:id' do
      upload = UploadRepository.get_by_id(params[:id])
      upload.tags = TagRepository.find_by_object_id(upload.id)
      if !upload then
        error! 'Upload not found', 404
      else
        JSON.parse(upload.to_json)
      end
    end

    get '/:id/download' do
      upload = UploadRepository.get_by_id params[:id]
      if !upload then
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
      errors = Array.new
      user_id = params[:userid]
      errors << Error.new("userid", "The userid field is required") if user_id.empty? || user_id == 'undefined'
      title = params[:title]
      errors << Error.new("title", "The title field is required") if title.empty? || title == 'undefined'
      tags_csv = params[:tags]
      errors << Error.new("tags", "At least one tag is required") if tags_csv.empty? || title == 'undefined'
      description = params[:description]
      if params[:image_file].nil?
        errors << Error.new("image_file", "Image upload is required")
      else
        type = params[:image_file].type
        original_file_name = params[:image_file].filename
        file = params[:image_file]
      end
      error! JSON.parse(errors.to_json), 403 if errors.length > 0
      file_name = Time.now.strftime('%Y%m%d%H%M%S%L') + '_' + original_file_name
      upload = Uploadmodel.new type, file_name, original_file_name, user_id, title, description
      upload_id = UploadRepository.save upload
      UploadRepository.transfer_file file, file_name
      TagHelper.process_tags tags_csv, upload_id, user_id
      upload_id
    end

  end

end