/**
 * Created by chadsfather on 15/12/15.
 */

exports.routes = function (app) {
     /**
      * Route '/'
      */
     require('./home').init(app);
     require('./users').init(app);
};
