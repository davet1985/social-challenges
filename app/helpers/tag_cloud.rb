class TagCloud

  def self.tag_cloud(tags)
    json_new = []
    tagJson = tags.each { |tag| json_new.push(JSON.parse({
      "id"=> tag[0], 
      "tag" => tag[2],
      "count" => 5
    }.to_json))
  }
    
    [
        {
            "totalCount" => 80,
            "tagCloud" => JSON.parse(json_new.to_json)
        }
    ].to_json
  end

end
