FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/2/neko.jpeg")
    user
    group
  end
end
