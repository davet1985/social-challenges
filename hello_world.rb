require 'grape'
require 'sqlite3'
require 'json'

require './words.rb'

class API < Grape::API

  get :hello do
    {hello: "world"}
  end

  get :words do
    Word.all
  end

  post '/add/:add' do
    word = Word.new(params[:add])
    word.save
  end

end