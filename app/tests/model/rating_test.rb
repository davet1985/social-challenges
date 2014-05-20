require 'minitest/autorun'

describe Rating do

  let(:rating) { Rating.new(1, 2, 3, 4) }

  it { rating.must_respond_to :userid }
  it { rating.userid.must_equal 1 }
  it { rating.must_respond_to :againstTag }
  it { rating.againstTag.must_equal 2 }
  it { rating.must_respond_to :objectId }
  it { rating.objectId.must_equal 3 }
  it { rating.must_respond_to :score }
  it { rating.score.must_equal 4 }

end