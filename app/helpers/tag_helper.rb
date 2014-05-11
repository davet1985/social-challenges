require_relative './../repository/tag_repository'

class TagHelper

  def self.process_tags(tags_csv, object_id, user_id)
    TagHelper.create_tags_from_csv(tags_csv, user_id).each do |tag| 
      tag_id = TagRepository.save tag
      TagRepository.tagObject object_id, tag_id
    end
  end

  def self.create_tags_from_csv(tags_csv, user_id)
    tags_csv.split(',').map { |t| Tag.new t, user_id }
  end
  
  def self.find_or_add_tag(tag, user_id)
    tag_id = TagRepository.findByName tag
    if tag_id == -1
      tag = Tag.new tag, user_id
      tag_id = TagRepository.save tag
    end
    tag_id
  end

end
