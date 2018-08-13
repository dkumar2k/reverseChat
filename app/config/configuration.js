// below we have dev environment DB details
module.exports = {
    'dbUrl' : process.env.dbUrl || 'mongodb://localhost:27017/testDB',
    'socketUrl' : process.env.socketUrl || 'http://localhost:3000'
};
