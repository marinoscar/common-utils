var   everyauth = require('everyauth')
    , appInfo   = require('./packageInfo');

var usersByGoogleId = {};

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth.everymodule.moduleErrback( function (err) {
  console.log(err);
});

everyauth.google
  .appId(appInfo.googleAppId)
  .appSecret(appInfo.googleSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/') // What you want access to
  .handleAuthCallbackError( function (req, res) {
  })
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
  })
  .redirectPath(appInfo.authenticationRedirect);

module.exports = everyauth;