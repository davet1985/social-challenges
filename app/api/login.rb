require 'grape'
require 'sqlite3'
require 'json'
require 'rack/contrib'
require 'warden'

require_relative './../model/user'
require_relative './../model/warden'

module SocialChallenges

  class LOGINAPI < Grape::API
    
    use Rack::Session::Cookie, :secret => "replace this with some secret key"

        use Warden::Manager do |manager|
          manager.default_strategies :password
          manager.failure_app = SocialChallenges::API
        end

    use Rack::JSONP
    format :json

    get :ping do
      {hello: "pong"}
    end
    
    post 'create' do
      GrapeWarden::User.save(params[:username], params[:password])
    end
    
    post 'activate/:token' do
      GrapeWarden::User.activate(params[:token])
    end
    
    post 'login' do
          env['warden'].authenticate(:password)
          error! "Invalid username or password", 401 unless env['warden'].user
          { "username" => env['warden'].user.name }
    end

    post 'logout' do
          env['warden'].authenticate
          error! "Logged out", 401 unless env['warden'].user

          env['warden'].logout
          { "status" => "ok" }
    end
    
    get "info" do
          env['warden'].authenticate
          error! "Unauthorized", 401 unless env['warden'].user
          { "username" => env['warden'].user.name }
    end
    
    get "info2" do
          env['warden'].authenticate
          error! "Unauthorized", 401 unless env['warden'].user
          { "well done" => env['warden'].user.name }
    end

  end

end