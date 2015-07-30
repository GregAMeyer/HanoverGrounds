module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
  },
  "FACEBOOK": {
    "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
    "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
    "callbackURL": "INSERT_FACEBOOK_CALLBACK_HERE"
  },
  "GOOGLE": {
    "clientID": "896220167912-lkogch2kf49715dq1mrunc503t5fu6d2.apps.googleusercontent.com",
    "clientSecret": "L7elJ4m7POvhM7Yf55rTGZwk",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};


//http://localhost:1337/auth/google/callback - google oauth doesn't work until deployed