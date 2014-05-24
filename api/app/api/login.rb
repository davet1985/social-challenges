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
        end

    use Rack::JSONP
    format :json

    get :ping do
      {hello: "pong"}
    end
    
    post 'create' do
      strength = PasswordStrength.test(params[:username], params[:password])
      if strength.strong?
        if params[:password] == params[:confirmPassword]
          if User.usernameDoesNotExist(params[:username])
            User.save(params[:username], params[:password], params[:email])
            { "status" => "user successfully created. You have been sent an email with instructions on how to activate the account" }
          else
            { "status" => "username already in use. Please chose another" }
          end
        else
          { "status" => "passwords do not match" }
        end
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
          User.changePassword(env['warden'].user.id, params[:password])
          { "status" => "password changed successfully" }
        else
          { "status" => "passwords do not match" }
        end
      else
        { "status" => "password not strong enough" }
      end
    end
    
    post 'activate/:token' do
      if User.activate(params[:token])
        { "status" => "Account activated" }
      else
        { "status" => "Invalid token provided" }
      end
    end
    
    post 'forgot-password' do
      User.sendForgotPassword(params[:email])
      { "status" => "email sent to address provided if it is a valid email" } 
    end
    
    post 'forgot-password/:token' do
      strength = PasswordStrength.test("test", params[:password])
      if strength.strong?
        if params[:password] == params[:confirmPassword]
          userId = User.getIdFromToken(params[:token])
          if userId != -1
            User.changePassword(userId, params[:password])
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
          user = User.authenticate(params[:username], params[:password])
          error! "Invalid username or password", 401 unless user != nil
          { "username" => user.name, "id" => user.id, "token" => user.token }
    end

    post 'logout' do
          user = User.get(params[:token])
          error! "Logged out", 401 unless user != nil

          User.logout(params[:token])
          { "status" => "ok" }
    end
    
    post "info" do
          user = User.get(params[:token])
          error! "Unauthorized", 401 unless user != nil
          { "username" => user.name }
    end
    
    post "info2" do
          env['warden'].authenticate
          error! "Unauthorized", 401 unless env['warden'].user
          { "well done" => env['warden'].user.name }
    end

  end

end