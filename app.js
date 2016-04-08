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
    idioms = require('./idioms/'),
    middlewares = require('./middlewares'),
    viewsCache = process.env.NODE_ENV === 'production',
    staticsCache = process.env.NODE_ENV === 'production' ? 300 : 0;

console.info('viewsCache: ', viewsCache);

idioms.getAvailableLangs(function () {
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
     * Config Passport
     */
    passport.use('local', middlewares.passportUse(LocalStrategy));
    passport.serializeUser(middlewares.serializeUser());
    passport.deserializeUser(middlewares.deserializeUser());

    /**
     * Middlewares
     */
    app.use(middlewares.getRandomImgForHome());
    app.use(middlewares.setFBId());
    app.use(middlewares.userObject());
    app.use(middlewares.renderGdriveUrl());
    app.use(middlewares.renderUrl());

    /**
     * Framework inits
     */

    app.use(i18n.init);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({keys: ['welkomiapp']}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(expressrouter);
    app.use('/statics', express.static(__dirname + '/statics', {'maxAge': staticsCache}));
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.set('view cache', viewsCache);

    /**
     * Other server config
     */
    expressrouter.prefix = express.Router.prefix = middlewares.prefixRouter(app, express);
    router.routes(expressrouter);

    /**
     * Initialize the server
     *
     * @type {http.Server}
     */
    var server = app.listen(process.env.PORT || 3000, function () {
        var host = server.address().address,
            port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);
    });
});
