class Store {

  load () {
    return Promise.all([
      $.ajax('/data/users.json'),
      $.ajax('/data/companies.json'),
      $.ajax('/data/photos.json'),
    ]).then(this.process.bind(this))
  }

  process (results) {
    this.users = results[0]
    this.companies = results[1]
    this.photos = results[2]
    this.usersById = this.users.reduce( (result, user) => {
      result[user.id] = user
      return result
    }, {})
    this.companies.forEach((company) => {
      company.creator = this.usersById[company.created_by_id]
    })
    this.photos.forEach((photo) => {
      photo.creator = this.usersById[photo.created_by_id]
    })
    return this
  }

  activityFeed () {
    let all = []
    all = all.concat( this.users.map((user) => { return {type: 'user', record: user}}))
    all = all.concat( this.companies.map((company) => { return {type: 'company', record: company}}))
    all = all.concat( this.photos.map((photo) => { return {type: 'photo', record: photo}}))
    all.sort( (item1, item2) => {
      var a = new Date(item1.record.created_at || item1.record.published_at);
      var b = new Date(item2.record.created_at || item2.record.published_at);
      return a > b ? -1 : a < b ? 1 : 0;
    })
    return all
  }

}

module.exports = Store
