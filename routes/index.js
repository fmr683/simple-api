var express = require('express');
var router = express.Router();
var url = require('url');



router.get('/api', function(req, res, next) {

    var err = "this is error";
    var data = { data: "Succuss"}
    if (err) {
        var error = Error (err)
        next(error.message)
        res.json({message:err})
    }else {
        res.json(data);
    }
	
});




module.exports = router;

