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

module.exports.get = function () {
  return data;
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
