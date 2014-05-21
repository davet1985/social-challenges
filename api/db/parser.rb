module Parser
  def self.parse(file, object)
    uploads = []
    CSV.foreach(file, :headers => true, header_converters: :symbol) do |csv_obj|
      uploads << object.new(csv_obj.field(:type), csv_obj.field(:file_name), csv_obj.field(:original_file_name), csv_obj.field(:userid), csv_obj.field(:title), csv_obj.field(:description), csv_obj.field(:upload_datetime), csv_obj.field(:id), csv_obj.field(:overallscore), csv_obj.field(:numofratings), csv_obj.field(:averagescore))
    end
    uploads
  end
end