require 'grape'
require 'sqlite3'
require 'json'
require 'rack/contrib'
require 'warden'
require 'password_strength'

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
      strength = PasswordStrength.test(params[:username], params[:password])
      if strength.strong?
        GrapeWarden::User.save(params[:username], params[:password], params[:email])
      else
        { "status" => "password not strong enough" }
      end
    end
    
    post 'change-password' do
      env['warden'].authenticate
      error! "Unauthorized", 401 unless env['warden'].user
      
      strength = PasswordStrength.test(env['warden'].user.name, params[:password])
      if strength.strong?
        if params[:password] == params[:confirmPassword]
          GrapeWarden::User.changePassword(env['warden'].user.id, params[:password])
          { "status" => "password changed successfully" }
        else
          { "status" => "passwords do not match" }
        end
      else
        { "status" => "password not strong enough" }
      end
    end
    
    post 'activate/:token' do
      if GrapeWarden::User.activate(params[:token])
        { "status" => "Account activated" }
      else
        { "status" => "Invalid token provided" }
      end
    end
    
    post 'forgot-password' do
      GrapeWarden::User.sendForgotPassword(params[:email])
      { "status" => "email sent to address provided if it is a valid email" } 
    end
    
    post 'forgot-password/:token' do
      strength = PasswordStrength.test("test", params[:password])
      if strength.strong?
        if params[:password] == params[:confirmPassword]
          userId = GrapeWarden::User.getIdFromToken(params[:token])
          if userId != -1
            GrapeWarden::User.changePassword(userId, params[:password])
            { "status" => "successfully changed password" }
          else
            { "status" => "token not valid" }
          end          
        else
          { "status" => "passwords do not match" }
        end
      else
        { "status" => "password not strong enough" }
      end
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