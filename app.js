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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(expressValidator({
    customValidators: {
        isIntArray: function(value) {
            if (Array.isArray(value)){
                for (var i =0; i < value.length; i++) {
                    if (typeof value[i] !== 'number' && value[i] % 1 != 0) {
                        return false;
                        break;
                    }
                }
                return true;
            }else {
                return false;
            }
        },
        isTime: function (value) {
           // regular expression to match required time format
            re = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;

            if(value != '') {		
              if(regs = value.match(re)) {
            if(regs[1] > 23) {
                    return false;
                }
            
                if(regs[2] > 59) {
                  return false;
                }
              } else {
                return false;
              }
            }

            return true;
        },
        isTimeWithSeconds: function (value) {
           return moment(value, "HH:mm:ss", true).isValid();
        }
    }
}))

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

/**
 * Enable metrics endpoint
 */
Prometheus.injectMetricsRoute(app);

/**
 * Enable collection of default metrics
 */
Prometheus.startCollection();
/** End Prometheus middleware */




app.use(router);


app.listen(port);
console.log('test node API ' + port ); 