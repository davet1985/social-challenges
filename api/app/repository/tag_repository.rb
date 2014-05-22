require 'sqlite3'

require_relative './../model/tag'
require_relative './../model/uploadmodel'
require_relative './../helpers/tag_helper'
require_relative './../helpers/upload_model_helper'

$db = SQLite3::Database.open 'hashbang.db'

class TagRepository

  def self.save(tag)
    insert =  <<-SQL
      INSERT INTO tags
      values (NULL, ?, ?, datetime('now'), 0)
      SQL
      $db.execute(insert, tag.tagName, tag.userId)
    tagId = $db.last_insert_row_id()
    tagId
  end
  
  def self.findByName(tagName)
    row = $db.get_first_row("select * from tags where tagName = ?", tagName)
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
    $db.execute(insert, objectId, tagId)
    update =  <<-SQL
      update tags
      set numOfObjects = numOfObjects + 1 
      where id = ?
      SQL
    $db.execute(update, tagId)
  end
  
  def self.all
    results = $db.execute("select id, userid, tagName, numOfObjects from tags")
  end

  def self.find_by_object_id(object_id)
    select = <<-SQL
      SELECT t.id, t.userid, t.tagName
      FROM tag_objects o join tags t on t.id = o.tagid
      WHERE o.objectid = ?
      SQL
    results = $db.execute(select, object_id)
    tags = TagHelper.cast_results results
  end

end