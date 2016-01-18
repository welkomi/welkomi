/**
 * Created by chadsfather on 15/12/15.
 *
 * Acceso a MONGO
 * mongodb://welkomi:appwelkomi@ds047782.mongolab.com:47782/heroku_4bzldjht
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    router = require('./router'),
    express = require('express'),
    swig = require('swig'),
    app = express(),
    expressrouter = express.Router(),
    models = require('./models'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    bodyParser = require('body-parser');

require('./customfilters');

/**
 * Framework inits
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['welkomiapp']}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressrouter);
app.use('/statics', express.static(__dirname + '/statics'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

/**
 * Config for passport
 */
passport.use(new LocalStrategy(models.model('User').authenticate()));
passport.serializeUser(models.model('User').serializeUser());
passport.deserializeUser(models.model('User').deserializeUser());

router.routes(expressrouter);

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address,
         port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
