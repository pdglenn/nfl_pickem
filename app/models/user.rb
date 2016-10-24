class User < ApplicationRecord
  has_many :picks, dependent: :destroy

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def wins
    picks.where(:result => 'win').count
  end

  def losses
    picks.where(:result => 'loss').count
  end

  def pushes
    picks.where(:result => 'push').count
  end

  def points
    (wins * 1) + (pushes * 0.5)
  end

  def get_picks_summary
    
  end
end
