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

function error(err, data) {
  console.log("ERROR: " + err);
  console.log("DATA: " + data);
}

app.get('/ws/item', function(req, res) {
  item.get(function (items) {
    res.send(items);
  }, error);
});

app.post('/ws/item', function(req, res) {
  item.add(req.body, function (item) {
    res.send(item);
  }, error);
});

app.put('/ws/item/:id', function(req, res) {
  item.save(req.params.id, req.body, function (item) {
    res.send(item);
  }, error);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});