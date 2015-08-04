var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.put('/users/:id', function(req, res) {

	User.findOneAndUpdate({
		_id: req.params.id
	}, req.body).exec()
		.then(function(updatedUser) {
			res.send(updatedUser)
		})
})

router.delete('/users/:id', function(req, res) {
	User.findByIdAndRemove(req.params.id).exec()
		.then(function(removedUser) {
			res.send(removedUser)
		})
})