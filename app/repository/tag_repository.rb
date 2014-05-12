require 'sqlite3'

require_relative './../model/tag'
require_relative './../model/upload'
require_relative './../helpers/tag_helper'

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
    uploads = Upload.cast results
    if uploads.count != 0
      randIndex = Random.new.rand(0..uploads.count-1)
      uploads[randIndex]
    else
      false
    end
  end
  
  def self.all
    results = $uploaddb.execute("select id, tagName from tags")
  end

  def self.find_by_object_id(object_id)
    select = <<-SQL
      SELECT t.id, t.userid, t.tagName
      FROM tag_objects o join tags t on t.id = o.tagid
      WHERE o.objectid = ?
      SQL
    results = $uploaddb.execute(select, object_id)
    tags = TagHelper.cast_results results
  end

end
