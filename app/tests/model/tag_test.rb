require 'minitest/autorun'

describe Tag do

  let(:tag) { Tag.new("Tag name", 1, 2) }

  it { tag.must_respond_to :tagName }
  it { tag.tagName.must_equal "Tag name" }
  it { tag.must_respond_to :userId }
  it { tag.userId.must_equal 1 }
  it { tag.must_respond_to :id }
  it { tag.id.must_equal 2 }

  describe "deserializing" do
    it "must deserialize to json" do
      tag.to_json.must_equal '"Tag name"'
    end
  end

end