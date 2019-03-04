
const LocalStrategy = require('passport-local').Strategy;

const User = rootRequire('database/models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User
      .findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(e, false);
      });
  });

  passport.use(new LocalStrategy((email, password, done) => {
    User
      .findOne({ email: email.toLowerCase() })
      .then((user) => {
        console.log('??');
        if (!user) {
          return done(null, false, { reason: 'User not found.' });
        }

        console.log('??2');
        if (!user.validPassword(password)) {
          return done(null, false, { reason: 'Wrong password.' });
        }

        console.log('??3');
        if (!user.permitted) {
          return done(null, false, { reason: 'A system administrator must allow your access.' });
        }

        console.log('??4');
        user.password = undefined;

        // Success
        return done(null, user);
      })
      .catch((e) => {
        return done(e, false, { reason: 'An internal error occurred. Please try again later' });
      });
  }));
};
