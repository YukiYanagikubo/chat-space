class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  mount_uploader :image, ImageUploader
  validates :messages, presence: true

  def messages
    content.presence || image.presence
  end

end
