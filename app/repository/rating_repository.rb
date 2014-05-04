require 'sqlite3'

require_relative './../model/rating'

$uploaddb = SQLite3::Database.open 'upload.db'

class RatingRepository

  def self.save(rating)
    insert =  <<-SQL
      INSERT INTO ratings
      values (NULL, datetime('now'), ?, ?, ?, ?)
      SQL
      $uploaddb.execute(insert, rating.againstTag, rating.objectId, rating.score, rating.userid)
  end
  
  def self.updateScore(objectId, score)
    update =  <<-SQL
      update uploads
      set overallScore = overallScore + ?, numOfRatings = numOfRatings + 1 
      where id = ?
      SQL
      $uploaddb.execute(update, score, objectId)
  end

end
