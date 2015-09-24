var Store = require('./../dist/app.js')
var moment = require('moment')

/*
$( () => {

  new Store().load().then( (store) => {

    store.activityFeed().forEach((entry) => {
      if (entry.type === 'user') {
        let article = $('<article class="user">')`<p class="date">${moment(new Date(entry.
          .append(record.created_at)).fromNow()}</p>`)
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
*/

var renderHeader = function(articleClass, entry) {
  return '<article class="' + articleClass + '">' + '<p class="date">' +
      moment(new Date(entry.created_at)).fromNow() + '</p>';
};
var renderArticle = function(articleClass, articleFormatter, entry) {
  return renderHeader(articleClass, entry) +
      articleFormatter(entry);
  };

var userFormatter = function(user) {
  return '<i class="fa fa-user"></i>' +
  '<h1>' + entry.full_name + '</h1>` +' +
  '`<p class="info">' + entry.record.email + '</p>';
};

var footerFormatter = function(entry) {
  return '<p class="info">Created by ' + entry.creator.full_name + ' ' + entry.creator.email + '</p>';
};

var companyFormatter = function(company) {
  return '<i class="fa fa-building"></i>' +
  '<h1>' + company.name + '</h1>' +
  footerFormatter(company);
};

var photoFormatter = function(photo) {
  return '<i class="fa fa-photo"></i>' +
        '<img src="' + photo.record.url + '">' +
        footerFormatter(photo);
};

var insertIntoBody = function(article) {
  $('body').append(article);
};