const express      = require('express'),
      path         = require('path'),
      logger       = require('morgan'),
      http         = require("http"),
      passport     = require("passport"),
      authInit     = require("./auth"),
      bodyParser   = require('body-parser'),
      queue        = require('./queue'),
      randomstring = require("randomstring");

const config = require("./config");

const base  = require("./routes/base"),
      users = require('./routes/users'),
      posts = require('./routes/posts'),
      votes = require('./routes/votes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
authInit(app);

// Static paths (mostly for Swagger)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/base', base);
app.use('/user', users);
app.use('/post', posts);
app.use("/vote", votes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(500);
  res.json({ message: "Operation failed" })
});

app.use(function(req, res, next) {
    queue(config.queue.exchangeName).then(exchange => {
      req.quque = exchange;
      next();
    });
});


// Running the server
app.server = http.createServer(app);
app.server.listen(config.http.port);

console.log("Started server");