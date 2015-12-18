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
      * Route /cmslanguage
      */
     require('./cmslanguage').init(expressrouter, idioms);

     /**
      * Route /cmslanguagelogin
      */
     require('./cmslanguagelogin').init(expressrouter, idioms);

     /**
      * Route /texts/:es/:key
      */
     require('./idiomsapi').init(expressrouter);
};
