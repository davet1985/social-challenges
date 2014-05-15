require 'sqlite3'

require_relative './../model/tag'
require_relative './../model/uploadmodel'

$uploaddb = SQLite3::Database.open 'upload.db'

class LeaderboardRepository
  
  def self.get_leaderboard_bytagname(tag, numberToGet)
    select =  <<-SQL
      SELECT *
      FROM uploads, tag_objects, tags
      WHERE uploads.id = tag_objects.objectId
      AND tags.id = tag_objects.tagId
      AND tags.tagName = ?
      ORDER BY uploads.averageScore DESC
      LIMIT ?
      SQL
    results = $uploaddb.execute(select, tag, numberToGet)
    uploads = Uploadmodel.cast results
  end
  


end
