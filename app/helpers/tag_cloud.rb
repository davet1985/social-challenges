class TagCloud

  def self.tag_cloud(tags)
    json_new = []
    minCount = 0
    maxCount = 0
    tagJson = tags.each { |tag|
      if minCount > tag[3] then
        minCount = tag[3]
      end

      if maxCount < tag[3] then
        maxCount = tag[3]
      end
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
            "minCount" => minCount,
            "maxCount" => maxCount,
            "tagCloud" => JSON.parse(json_new.to_json)
        }
    ].to_json
  end

end
