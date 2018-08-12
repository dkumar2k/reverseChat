let express = require('express');
let router = express.Router();

// module.exports = function() {
console.log('----------reached user routes')
// Employee Routes
let user = require('../controllers/user');
router.get('/:id', user.getMe);
router.post('/create', user.createMe);
// app.route('/user/accounts').delete(user.remove);
module.exports = router;

// };