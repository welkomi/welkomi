/**
 * Created by chadsfather on 15/12/15.
 */

var idioms = require('./../idioms');

exports.routes = function (expressrouter) {
    /**
     * Passport strategies
     *
     * passport Route
     */
    require('./passportroutes').init(expressrouter);

    /**
     * CMS for text API
     *
     * Route /cmslanguage
     */
    require('./cmslanguage').init(expressrouter, idioms);

    /**
     * Route /users
     */
    require('./users').init(expressrouter, idioms);

    /**
     * Route /publish
     */
    require('./publish').init(expressrouter, idioms);

    /**
     * Translate text API
     *
     * Route /texts/:es/:key
     */

    /**
     *Rutas de usuario
     */
    require('./userinterface').init(expressrouter);

    /**
     * USER REGISTER
     *
     * Route /texts/:es/:key
     */
    require('./profile').init(expressrouter, idioms);

    /**
     * profile users
     *
     * Route /profile
     */
    require('./idiomsapi').init(expressrouter);

    /**
     * Cache router api
     */
    require('./cacheapi').init(expressrouter);

    /**
     * Google router api
     */
    require('./googleapi').init(expressrouter);

    /**
     *Probando paralex footer
     */
    require('./paralex').init(expressrouter, idioms);

    /**
     * This is the entry point of all webapplication
     * and must be stay on last position
     *
     * Route '/'
     */
    require('./home').init(expressrouter, idioms);

    /**
     * tour Publish site
     *
     * Route '/'
     */
    require('./tourpublish').init(expressrouter, idioms);
};
