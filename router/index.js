/**
 * Created by chadsfather on 15/12/15.
 */

var idioms = require('./../idioms');

exports.routes = function (expressrouter) {
     /**
      * Route '/'
      */
     require('./home').init(expressrouter, idioms);

     /**
      * Route /users
      */
     require('./users').init(expressrouter, idioms);

     /**
      * CMS for text API
      *
      * Route /cmslanguage
      */
     require('./cmslanguage').init(expressrouter, idioms);

     /**
      * Translate text API
      *
      * Route /texts/:es/:key
      */
     require('./idiomsapi').init(expressrouter);

     /**
      * passport Route
      */

     require('./passportroutes').init(expressrouter, idioms);
};
