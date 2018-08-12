const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

console.log('----------reached auth routes');



router.get('/facebookCallbackUrl', auth.facebookCallback);



module.exports = router;

