/**
 * Created by chadsfather on 15/12/15.
 */

var router = require('./router'),
     express = require('express'),
     swig = require('swig'),
     app = express(),
     idioms = require('./idioms');

require('./customfilters')

app.use(idioms());
app.use('/statics', express.static(__dirname + '/statics'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);

router.routes(app);

var server = app.listen(process.env.PORT || 3000, function () {
     var host = server.address().address;
     var port = server.address().port;

     console.log('App listening at http://%s:%s', host, port);
});