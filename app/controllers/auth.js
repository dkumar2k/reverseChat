
const facebookCallback = (req, res) => {
	console.log('reached facebookCallback');
	res.status(200).end();

};




module.exports = {
	facebookCallback : facebookCallback
};