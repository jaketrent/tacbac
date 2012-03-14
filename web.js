var express = require('express');
var item = require('./lib/item.js');

var app = express.createServer(express.logger());

app.configure(function () {
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack:true
  }));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');

app.set('view options', { layout: false });

app.register('.html', {
  compile: function(str, options){
    return function(locals){
      return str;
    };
  }
});

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/ws/item', function(req, res) {
  item.get(function (items) {
    res.send(items);
  });
});

app.post('/ws/item', function(req, res) {
  var item = res.body.item;
  res.send(item.add(item));
});

app.put('/ws/item/:id', function(req, res) {
  res.send(item.save(req.params.id, req.body.item));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});