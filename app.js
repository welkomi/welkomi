/**
 * Created by chadsfather on 15/12/15.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    router = require('./router'),
    express = require('express'),
    swig = require('swig'),
    app = express(),
    expressrouter = express.Router(),
    models = require('./models'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    i18n = require('i18n'),
    idioms = require('./idioms/');

idioms.getAvailableLangs(function () {
    require('./customfilters');

    /**
     * Config for i18n
     */
    i18n.configure({
        'locales': ___availableLangs.array,
        'directory': __dirname + '/locales',
        'defaultLocale': 'en',
        'cookie': 'langcookie',
        'queryParameter': 'lang',
        //'updateFiles': false,
        'register': global
    });

    /**
     * Framework inits
     */
    app.use(function (req, res, next) {
        res.locals.renderGdriveUrl = function (folder, file) {
            return process.env.GDRIVE_URI + folder + '/' + file;
        };

        next();
    });

    app.use(i18n.init);
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
    //passport.use(new LocalStrategy(models.model('User').authenticate()));
    //passport.serializeUser(models.model('User').serializeUser());
    //passport.deserializeUser(models.model('User').deserializeUser());

    passport.use(new LocalStrategy({
        'usernameField': 'username',
        'passwordField': 'password'
        },
        function (req, username, password, next) {
            console.log('config', req);
            console.log('config', username);
            console.log('config', password);
        }
    ));

    /**
     * Other server config
     */
    expressrouter.prefix = express.Router.prefix = function (path, configure) {
        var router = express.Router();

        this.use (path, router);

        configure(router);

        return router;
    };

    router.routes(expressrouter);

    var server = app.listen(process.env.PORT || 3000, function () {
        var host = server.address().address,
            port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);
    });
});
