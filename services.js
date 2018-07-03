exports.addStatus = function (request, res) {
	var s_text = request.body.s_text;

	req.getConnection(function(err, connection) {
		if(err){
			console.log(err.message);
			res.json({code:200});
			return;
		}
		connection.query("INSERT INTO `status` (`s_text`) VALUES ('?')",[s_text], function(err, rows) {
			if (err) {
				console.log(err.message);
				res.json({code:200});
			} else {
				res.json({code:200});
			}

		});
	});

}