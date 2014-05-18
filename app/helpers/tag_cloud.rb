class TagCloud

  def self.tag_cloud(tags)
    json_new = []
    totalCount = 0
    tagJson = tags.each { |tag| 
      totalCount = totalCount + tag[3]
      json_new.push(JSON.parse({
        "id"=> tag[0], 
        "tag" => tag[2],
        "count" => tag[3]
      }.to_json))
  }
    
    [
        {
            "totalCount" => totalCount,
            "tagCloud" => JSON.parse(json_new.to_json)
        }
    ].to_json
  end

end
