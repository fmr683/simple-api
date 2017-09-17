var express = require('express');
var router = express.Router();
var url = require('url');



router.get('/api', function(req, res) {

    var err = "this is error";
    var errObj = {error: "error object"}
    var data = { data: "Succuss"}
    if (errObj) {
        res.json({message:errObj});
    }else {
        res.json(data);
    }
	
});




module.exports = router;

