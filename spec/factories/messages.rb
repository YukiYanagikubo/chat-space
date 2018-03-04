FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/app/assets/images/neko.jpeg")
    user
    group
  end
end
