require_relative './../repository/tag_repository'

class UploadModelHelper

  def self.cast_upload_results(results)
    uploads = Array.new
    results.each { |r|
      upload = Uploadmodel.new(r[2], r[3], r[4], r[12], r[9], r[10], r[1], r[0], r[6], r[7], r[8], r[14])
      upload.tags = TagRepository.find_by_object_id upload.id
      uploads << upload 
    }
    uploads
  end

end
