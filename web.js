var express = require('express');
var item = require('./lib/item.js');
var user = require('./lib/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express.createServer(express.logger());

app.configure(function () {
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
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

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.get(username, password, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Unkown user ' + username });
      }
      if (user.pwd != password) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  user.getById(id, function (err, user) {
    done(err, user);
  });
});

app.get('/login', function(req, res) {
  res.render('login.html');
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/', auth, function(req, res) {
  res.render('index.html');
});

function error(err, data) {
  console.log("ERROR: " + err);
  console.log("DATA: " + data);
}

app.get('/ws/item', auth, function(req, res) {
  item.get(function (items) {
    res.send(items);
  }, error);
});

app.post('/ws/item', auth, function(req, res) {
  item.add(req.body, function (item) {
    res.send(item);
  }, error);
});

app.put('/ws/item/:id', auth, function(req, res) {
  item.save(req.params.id, req.body, function (item) {
    res.send(item);
  }, error);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});