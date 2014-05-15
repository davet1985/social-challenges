require_relative './../repository/tag_repository'
require_relative './../model/tag'

class UploadModelHelper

def self.cast_upload(results)
  uploads = Array.new
  results.each { |r| uploads << upload = Uploadmodel.new(r.type, r.file_name, r.original_file_name, r.userid, r.title, r.description, r.upload_datetime, r.id, r.overallScore, r.numOfRatings, r.averageScore) 
                                upload.set_tags TagRepository.find_by_object_id(upload.id)
                                upload }
  uploads
end

end