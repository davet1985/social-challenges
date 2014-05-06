require 'json'

class Tag

  attr_reader :tagName, :userId

  def initialize(tagName, userId, id = nil)
    @tagName = tagName
    @userId = userId
    @id = id
  end
  
  def self.findTagOrAddIfNotFound(tag, userId)
    tagId = TagRepository.findByName tag
    if tagId == -1
      tag = Tag.new tag, userId
      tagId = TagRepository.save tag
    end
    tagId
  end

end
