require 'sqlite3'

require_relative './../model/tag'
require_relative './../model/upload'

$uploaddb = SQLite3::Database.open 'upload.db'

class TagRepository

  def self.save(tag)
    insert =  <<-SQL
      INSERT INTO tags
      values (NULL, ?, ?, datetime('now'))
      SQL
      $uploaddb.execute(insert, tag.tagName, tag.userId)
    tagId = $uploaddb.last_insert_row_id()
    tagId
  end
  
  def self.findByName(tagName)
    row = $uploaddb.get_first_row("select * from tags where tagName = ?", tagName)
    tagId = -1
    if row != nil
      tagId = row[0]
    end
    tagId
  end
  
  def self.tagObject(objectId, tagId)
    insert =  <<-SQL
      INSERT INTO tag_objects
      values (NULL, ?, ?, datetime('now'))
      SQL
      $uploaddb.execute(insert, objectId, tagId)
  end
  
  def self.get_random_object_bytagname(id)
    select =  <<-SQL
      SELECT *
      FROM uploads, tag_objects, tags
      WHERE uploads.id = tag_objects.objectId
      AND tags.id = tag_objects.tagId
      AND tags.tagName = ?
      SQL
    results = $uploaddb.execute(select, id)
    uploads = self.cast results
    if uploads.count != 0
      randIndex = Random.new.rand(0..uploads.count-1)
      uploads[randIndex]
    else
      false
    end
  end
  
  def self.cast(results)
    uploads = Array.new
    results.each { |r| uploads << Upload.new(r[2], r[3], r[4], r[5], r[8], r[9], r[1], r[0], r[6], r[7]) }
    uploads
  end
  
  def self.all
    results = $uploaddb.execute("select id, tagName from tags")
  end

end
