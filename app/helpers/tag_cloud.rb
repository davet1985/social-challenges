class TagCloud

  def self.tag_cloud(tags)
    json_new = []
    tagJson = tags.each { |tag| 
      json_new.push(JSON.parse({
        "id"=> tag[0], 
        "tag" => tag[2],
        "count" => tag[3]
      }.to_json))
  }
  totalCount = tags.count
    
    [
        {
            "totalCount" => totalCount,
            "tagCloud" => JSON.parse(json_new.to_json)
        }
    ].to_json
  end

end
