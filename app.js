/**
 * Created by chadsfather on 15/12/15.
 *
 * Acceso a MONGO
 * mongodb://welkomi:appwelkomi@ds047782.mongolab.com:47782/heroku_4bzldjht
 */

var router = require('./router'),
    express = require('express'),
    swig = require('swig'),
    app = express(),
    expressrouter = express.Router();

require('./customfilters');

app.use(expressrouter);
app.use('/statics', express.static(__dirname + '/statics'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);

router.routes(expressrouter);

var server = app.listen(process.env.PORT || 3000, function () {
     var host = server.address().address;
     var port = server.address().port;

     console.log('App listening at http://%s:%s', host, port);
});