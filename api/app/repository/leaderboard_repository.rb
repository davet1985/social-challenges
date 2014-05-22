require 'sqlite3'

require_relative './../model/tag'
require_relative './../model/uploadmodel'
require_relative './../helpers/upload_model_helper'

$db = SQLite3::Database.open 'hashbang.db'

class LeaderboardRepository
  
  def self.get_leaderboard_bytagname(tag, numberToGet)
    select =  <<-SQL
      SELECT *
      FROM uploads, users, tag_objects, tags
      WHERE uploads.id = tag_objects.objectId
      AND tags.id = tag_objects.tagId
      AND uploads.userid = users.id
      AND tags.tagName = ?
      ORDER BY uploads.overallScore DESC
      LIMIT ?
      SQL
    results = $db.execute(select, tag, numberToGet)
    uploads = UploadModelHelper.cast_upload_results results
  end
  


end
