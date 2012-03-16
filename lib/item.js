var databaseUrl = process.env.MONGOHQ_URL || 'tacbac';
var collections = ['items'];
var db = require('mongojs').connect(databaseUrl, collections);
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

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
