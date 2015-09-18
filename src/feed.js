var Store = require('./store.js')
var moment = require('moment')

$( () => {

  new Store().load().then( (store) => {

    store.activityFeed().forEach((entry) => {
      if (entry.type === 'user') {
        let article = $('<article class="user">')
          .append(`<p class="date">${moment(new Date(entry.record.created_at)).fromNow()}</p>`)
          .append(`<i class="fa fa-user"></i>`)
          .append(`<h1>${entry.record.full_name}</h1>`)
          .append(`<p class="info">${entry.record.email}</p>`)
        $('body').append(article)
      } else if (entry.type === 'company') {
        let article = $('<article class="company">')
          .append(`<p class="date">${moment(new Date(entry.record.created_at)).fromNow()}</p>`)
          .append(`<i class="fa fa-building"></i>`)
          .append(`<h1>${entry.record.name}</h1>`)
          .append(`<p class="info">Created by ${entry.record.creator.full_name} (${entry.record.creator.email})</p>`)
        $('body').append(article)
      } else if (entry.type === 'photo') {
        let article = $('<article class="photo">')
          .append(`<p class="date">${moment(new Date(entry.record.published_at)).fromNow()}</p>`)
          .append(`<i class="fa fa-photo"></i>`)
          .append(`<img src="${entry.record.url}">`)
          .append(`<p class="info">Created by ${entry.record.creator.full_name} (${entry.record.creator.email})</p>`)
        $('body').append(article)
      }
    })

  })

})
