require 'minitest/autorun'

describe Error do

  let(:error) { Error.new("Field name", "Field name is required.") }

  it { error.must_respond_to :field_name }
  it { error.field_name.must_equal "Field name" }
  it { error.must_respond_to :message }
  it { error.message.must_equal "Field name is required." }

  describe "deserializing" do
    it "must deserialize to json" do
      error.to_json.must_equal '{"field_name":"Field name","message":"Field name is required."}'
    end
  end

end