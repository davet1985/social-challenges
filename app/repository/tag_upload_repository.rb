require_relative './../helpers/upload_model_helper'
require_relative './../model/uploadmodel'

$uploaddb = SQLite3::Database.open 'upload.db'

class TagUploadRepository

def self.get_random_object_bytagname(id, excludeIds)
  select =  <<-SQL
    SELECT *
    FROM uploads u, tag_objects, tags
    WHERE u.id = tag_objects.objectId
    AND tags.id = tag_objects.tagId
    AND tags.tagName = ?
    SQL
  results = $uploaddb.execute(select, id)
  
  uploads = UploadModelHelper.cast_upload_results results
  uploads_temp = uploads
  uploads.delete_if { |upload| excludeIds.include?(upload.id) }
  
  if uploads.count != 0
    randIndex = Random.new.rand(0..uploads.count-1)
    uploads[randIndex]
  else
    false
  end
end

end