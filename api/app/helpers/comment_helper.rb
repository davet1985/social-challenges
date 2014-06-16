
class CommentHelper

  def self.toJSON(comments)
    json_new = []
    
    comments.each { |comment|
      
      md5gravatar = Digest::MD5.hexdigest(comment[4])
        
      json_new.push(JSON.parse({
        "id"=> comment[0], 
        "username" => comment[1],
        "comment" => comment[2],
        "datetime" => comment[3],
        "gravatar" => md5gravatar
      }.to_json))
    }
    json_new.to_json
  end

end