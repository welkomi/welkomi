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
    crons = require('./crons');
    viewsCache = process.env.NODE_ENV === 'production',
    staticsCache = process.env.NODE_ENV === 'production' ? process.env.CACHE_TIME : 0,
    clientsSocket = [];


console.info('viewsCache: ', viewsCache);
console.info('staticsCache: ', staticsCache);

/**
 * Crons jobs
 */
crons.init({
    'sendVerificationMail': '*/3 * * * *'
    //'sendVerificationMail': '*/5 * * * *'
});

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
    app.use(middlewares.enviromentName());
    app.use(middlewares.getRandomImgForHome());
    app.use(middlewares.setFBId());
    app.use(middlewares.userObject());
    app.use(middlewares.renderGdriveUrl());
    app.use(middlewares.renderUrl());
    app.use(middlewares.slugify());
    app.use(middlewares.getlangs());

    /**
     * Framework inits
     */
    app.use(i18n.init);
    app.use(bodyParser.json({
        'limit': '50mb'
    }));
    app.use(bodyParser.urlencoded({
        'limit': '50mb',
        'extended': false
    }));
    app.use(cookieParser());
    app.use(session({'keys': ['welkomiapp']}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(expressrouter);
    app.use('/statics', express.static(__dirname + '/statics', {'maxAge': staticsCache}));
    app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client', {'maxAge': staticsCache}));
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.set('view cache', viewsCache);

    /**
     * Other server config
     */
    expressrouter.prefix = express.Router.prefix = middlewares.prefixRouter(app, express);
    router.routes(expressrouter);

    /*
     * Improvement to capture Error Page
     */
    app.use(function(req, res) {
        res.status(404);
        res.render('404', {});
    });
    
    /**
     * Initialize the server
     *
     * @type {http.Server}
     */
    var server = app.listen(process.env.PORT || 3000, function () {
        var host = server.address().address,
            port = server.address().port;
        
        GLOBAL.port = port;

        console.log('App listening at http://%s:%s', host, port);
    });

    var io = require('socket.io')(server);
        
    /**
     * Config for socket.io
     */
    io.on('connection', function (socket) {        
        socket.emit('ClientId', {
            'id': socket.id 
        });
        
        socket.on('ClientConnnected', function (id) {
            clientsSocket.push(id);            
        });

        socket.on('disconnect', function (data) {
            console.log('Perdimos un usuario', data);
        });
        
        socket.on('sendAll', function () {
            clientsSocket.forEach(function (id) { 
                if (io.sockets.connected[id]) {
                    io.sockets.connected[id].emit('message', {
                        'msg': 'Hola',
                        'id': id
                    });
                }
            });
        });
        
        socket.on('messageArea', function (data) {            
            clientsSocket.forEach(function (id) {
                if (io.sockets.connected[id]) {
                    io.sockets.connected[id].emit('fromArea', data);
                }
            });
        });
        
        socket.on('move', function (data) {
            clientsSocket.forEach(function (id) {
                if (io.sockets.connected[id]) {
                    io.sockets.connected[id].emit('square', data);
                }
            });
        });
    });

});
