var usersById = function (users) {
    return users.reduce(function (result, user) {
            result[user.id] = user;
            return result;
        }, {}
    )
};


var companies = function (companyList, userHash) {
   return  companyList.map(function (company) {
        company.creator = userHash[company.created_by_id];
        company.formatter = renderArticle.bind(null, 'company', companyFormatter);
        return company;
    });
};


var photos = function (photoList, userHash) {
    return photoList.map(function (photo) {
        photo.creator = userHash[photo.created_by_id];
        photo.formatter = renderArticle.bind(null, 'photo', photoFormatter);
        return photo;
    });
};

var users = function (userList) {
    return userList.map(function (user) {
        user.formatter = renderArticle.bind(null, 'user', userFormatter);
        return user;
    });
};

var activityFeed = function (users, companies, photos) {
    return users.concat(companies, photos).sort(function (item1, item2) {
        var a = new Date(item1.created_at || item1.published_at);
        var b = new Date(item2.created_at || item2.published_at);
        return a > b ? -1 : a < b ? 1 : 0;
    });
};

var renderHeader = function (articleClass, entry) {
    return '<article class="' + articleClass + '">' + '<p class="date">' +
        moment(new Date(entry.created_at)).fromNow() + '</p>';
};

var renderArticle = function (articleClass, articleFormatter, entry) {
    return renderHeader(articleClass, entry) +
        articleFormatter(entry);
};

var userFormatter = function (user) {
    return '<i class="fa fa-user"></i>' +
        '<h1>' + user.full_name + '</h1>` +' +
        '`<p class="info">' + user.email + '</p>';
};

var footerFormatter = function (entry) {
    return '<p class="info">Created by ' + entry.creator.full_name + ' ' + entry.creator.email + '</p>';
};

var companyFormatter = function (company) {
    return '<i class="fa fa-building"></i>' +
        '<h1>' + company.name + '</h1>' +
        footerFormatter(company);
};

var photoFormatter = function (photo) {
    return '<i class="fa fa-photo"></i>' +
        '<img src="' + photo.url + '">' +
        footerFormatter(photo);
};

var insertIntoBody = function (article) {
    $('body').append(article);
};

var renderPage = function(feed) {
    feed.forEach(function(activity) {
        insertIntoBody(activity.formatter(activity));
    });
}
var formatPage = function(data) {
    var userHash = usersById(data[0]);
    renderPage(activityFeed(users(data[0]), companies(data[1], userHash), photos(data[2], userHash)));
};

var createPage = function() {
        Promise.all([
            $.ajax('/data/users.json'),
            $.ajax('/data/companies.json'),
            $.ajax('/data/photos.json')
        ]).then(function(result) {
            formatPage(result);
        })
    };

createPage();