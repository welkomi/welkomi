/**
 * Created by chadsfather on 15/12/15.
 */

exports.routes = function (app) {
     /**
      * Route '/'
      */
     require('./home').init(app);

     /**
      * Route /users
      */
     require('./users').init(app);

     /**
      * Route /texts/:es/:key
      */
     require('./idiomsapi').init(app);
};
