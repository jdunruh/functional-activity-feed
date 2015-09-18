require 'active_support/all'
require 'faker'

users, companies, photos = [], [], []

30.times do |i|
  users << {
    id: i,
    email: Faker::Internet.safe_email,
    full_name: Faker::Name.name,
    created_at: Faker::Date.between(2.years.ago, Date.today)
  }

  rand(3).times do
    companies << {
      name: Faker::Company.name,
      created_by_id: i,
      created_at: Faker::Date.between(2.years.ago, Date.today)
    }
  end

  rand(3).times do
    photos << {
      url: "http://lorempixel.com/g/40/40/?cache=#{rand}",
      created_by_id: i,
      published_at: Faker::Date.between(2.years.ago, Date.today)
    }
  end
end

puts JSON.pretty_generate(users)
puts JSON.pretty_generate(companies)
puts JSON.pretty_generate(photos)
