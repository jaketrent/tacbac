var databaseUrl = 'tacbac'; // "username:password@example.com/mydb"
var collections = ['items'];
var db = require('mongojs').connect(databaseUrl, collections);
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var data = [
  {
    cat: '2012',
    title: 'Jan',
    points: [
      {
        title: 'Batman',
        body: '- Do this \n- Start this'
      }, {
        title: 'Robin',
        body: '- Mentor this'
      }, {
        title: 'Action',
        body: '- Wowness'
      }
    ]
  },{
    cat: '2012',
    title: 'Feb',
    points: [
      {
        title: 'Robin',
        body: '- Again we meet around the board'
      }, {
        title: 'Action',
        body: '- Continuations of speculations'
      }
    ]
  }
];

module.exports.get = function (success, error) {
  db.items.find(function(err, items) {
    var result = [];
    if( err || !items) error(err, items);
    else items.forEach(function(item) {
      result.push(item);
    });
    success(result);
  });
};

module.exports.add = function (item, success, error) {
  db.items.save({
    cat: item.cat,
    title: item.title,
    create_date: new Date(),
    points: []
  }, function (err, saved) {
    if (err || !saved) {
      error(err, saved);
    } else {
      success(item);
    }
  });
};

module.exports.save = function (id, item, success, error) {
  db.items.update({
    _id: new BSON.ObjectID(id)
  }, {
    $set: {
      title: item.title,
      points: item.points
    }
  }, function (err, updated) {
    if (err || !updated) {
      error(err, item);
    } else {
      success(item);
    }
  });
};
