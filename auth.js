const passport       = require("passport"),
      LocalStrategy  = require('passport-local').Strategy,
      BearerStrategy = require('passport-http-bearer').Strategy;

const User           = require("./models/user");

module.exports = function(app) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({where: { username: username, password: User.hashPassword(password) }})
                .then(user => {
                    if (!user) return done(null, false, { message: 'Incorrect username.' });

                    return user.update({
                        token: User.hashPassword(randomstring.generate())
                    });
                })
                .then(user => {
                    if (user) return done(null, user);
                });
        }
    ));

    passport.use(new BearerStrategy(
        function(token, done) {
            User.findOne({ token: token })
                .then(user => {
                    if (!user) return done(null, false);

                    return done(null, user, { scope: 'all' });
                });
        }
    ));

    app.use(passport.initialize());
};