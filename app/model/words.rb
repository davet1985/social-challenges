$wordsdb = SQLite3::Database.open 'word.db'

class Word

  attr_reader :text

  def initialize(text)
    @text = text
  end

  def self.all
    sorted = $wordsdb.execute("select * from words")
  end

  def save
    insert =  <<-SQL
      INSERT INTO words
      values (NULL, ?)
      SQL
      $wordsdb.execute(insert, self.text)
  end

end
