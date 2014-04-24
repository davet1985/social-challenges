$db = SQLite3::Database.open 'word.db'

class Word

  attr_reader :text

  def initialize(word)
    @text = word
  end

  def self.all
    sorted = $db.execute("select * from words")
  end

  def save
    insert =  <<-SQL
      INSERT INTO words
      values (NULL, ?)
      SQL
      $db.execute(insert, self.text)
  end

end
