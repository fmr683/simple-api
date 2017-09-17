global.pNameSpace = "test_api_"
global.client = require('prom-client');
global.moment = require('moment');

var express = require('express');
var expressValidator = require('express-validator');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes');

//monk.mongoList();
app.use(bodyParser.urlencoded({extented:true}));
app.use(bodyParser.json());
app.use(expressValidator([]));

var port = process.env.PORT || 8978;




/** Start Prometheus middleware */
/**
 * This creates the module that we created in the step before.
 * In my case it is stored in the util folder.
 */

var Prometheus = require('./util/prometheus')
//Prometheus.setApiName("app_geo_api_count")

/**
 * The below arguments start the counter functions
 */
app.use(Prometheus.requestCounters);  
app.use(Prometheus.responseCounters);
//app.use(Prometheus.logger);

/**
 * Enable metrics endpoint
 */
Prometheus.injectMetricsRoute(app);

/**
 * Enable collection of default metrics
 */
Prometheus.startCollection();
/** End Prometheus middleware */


app.use(function(err,req,res,next) {
  //console.log( "TET");
})

//app.use(router);

router.get('/',function(req,res,next) {
  var error = Error('Article is not found');
 // next(error.message);
 return res.send("Hello World!");
});

app.use('/',router);




app.listen(port);
//console.log('test node API ' + port ); 