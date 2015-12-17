/**
 * Created by ssanchez on 17/12/15.
 */

/**
 * http://localhost:3000/texts/es_ES/hola-mundo
 * http://localhost:3000/texts/en_EU/hola-mundo
 * @type {Function|*}
 */
var redis = require('./../../wrappers/rediswrapper').init();

exports.init = function (app) {
    app.get('/texts/:lang/:key', function (req, res) {
        var lista = 'idioms:' + req.params.lang,
            key = req.params.key;

        redis.hget(lista, key, function (err, response) {
            if (err) throw err;

            res.json(response);
        });
    });
};