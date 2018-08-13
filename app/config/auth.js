module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.fbClientId || 'testValues', // your App ID
        'clientSecret'  : process.env.fbClientSecret || 'testValues123', // your App Secret
        'callbackURL'   : process.env.fbCallbackURL || 'testCallbackUrl',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,email',
        'profileFields' : ['id', 'email', 'name', 'photos'] // For requesting permissions from Facebook API
    }

};
