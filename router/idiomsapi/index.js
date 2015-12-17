/**
 * Created by ssanchez on 17/12/15.
 */

var redis = require('./../../wrappers/rediswrapper').init();

exports.init = function (app) {
    app.get('/texts/:lang/:key', function (req, res) {
        redis.hget('idiomas:es_ES', 'contact', function (err, response) {
            if (err) throw err;

            console.log(response);
        });
    });
};
