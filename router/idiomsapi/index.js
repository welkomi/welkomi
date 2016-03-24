/**
 * Created by ssanchez on 17/12/15.
 */

/**
 * http://localhost:3000/texts/language/es/dog
 * http://localhost:3000/texts/language/en/dog
 * @type {Function|*}
 */
var redis = require('./../../wrappers/rediswrapper').init();
var models = require('./../../models');

exports.init = function (expressrouter) {
    expressrouter.get('/texts/languages/', function (req, res) {
        redis.keys('language:*', function (err, response) {
            if (err) throw err;

            res.json(response);
        });
    });

    expressrouter.get('/texts/language/:lang', function (req, res) {
        redis.hgetall('language:' + req.params.lang, function (err, response) {
            if (err) throw err;

            res.json(response);
        });
    });

    expressrouter.get('/texts/:lang/:key', function (req, res) {
        var lista = 'language:' + req.params.lang,
             key = req.params.key;

        redis.hget(lista, key, function (err, response) {
            if (err) throw err;

            res.json(response);
        });
    });

    /**
     * NEW API
     */

    expressrouter.get('/getlangs/', function (req, res) {
        redis.lrange('languagesAvailable', 0, 3, function (err, response) {
            if (err) throw  err;

            res.json(response);
        });
    });

    expressrouter.get('/getlangs/:key', function (req, res) {
        redis.hgetall(req.params.key, function (err, response) {
            if (err) throw err;

            res.json(response);
        });
    });

    /**
     * REMAKE API IDIOMS WHIT MONGO
     */
    expressrouter.get('/langs-availables/', function (req, res) {
        var LanguagesSchema = models.model('Languages');

        LanguagesSchema
            .find({'languages': {'$exists': true}})
            .exec(function (err, response) {
                if (err) throw err;

                res.json(response);
            });
    });

    expressrouter.get('/langs-get-keys/', function (req, res) {
        var IdiomsSchema = models.model('Idioms');

        IdiomsSchema
            .find({},
            {
                '_id': 0,
                '__v': 0
            })
            .exec(function (err, response) {
                if (err) throw err;

                res.json(response);
            });
    });

    expressrouter.get('/langs-delete-key/', function (req, res) {
        var IdiomsSchema = models.model('Idioms');

        IdiomsSchema
            .find(req.query)
            .remove()
            .exec(function (errDelete, resDelete) {
                if (errDelete) throw errDelete;

                res.json(resDelete);
            });
    });

    expressrouter.get('/langs-save-keys/', function (req, res) {
        var IdiomsSchema = models.model('Idioms'),
            obj = req.query;

        IdiomsSchema
            .find({'key': obj.key})
            .exec(function (err, response) {
                if (err) throw  err;

                if (response.length > 0) {
                    IdiomsSchema.update({'key': obj.key}, {$set: obj}, function (errUpdate, responseUpdate) {
                        if (errUpdate) throw errUpdate;

                        res.json(responseUpdate);
                    });
                }

                else {
                    IdiomsSchema.create(obj, function (errCreate, responseCreate) {
                        if (err) throw err;

                        res.json(responseCreate);
                    });
                }
            });
    });
};