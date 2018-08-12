module.exports = {

    'facebookAuth' : {
        'clientID'      : '306018526625985', // your App ID
        'clientSecret'  : 'd5d58e0c52ad7447e1e3dc1ef4c2f1f2', // your App Secret
        'callbackURL'   : 'https://4dd5514b.ngrok.io/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }

};
