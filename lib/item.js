var databaseUrl = 'tacbac'; // "username:password@example.com/mydb"
var collections = ['items'];
var db = require('mongojs').connect(databaseUrl, collections);

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

module.exports.add = function (item) {
  console.log('adding...' + item);
  // with id
  return item;
};

module.exports.save = function (id, item) {
  console.log('saving...' + id, ', ' + item);
  return item;
};
