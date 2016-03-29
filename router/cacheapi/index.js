/**
 * Created by ssanchez on 28/03/16.
 */
var redis = require('./../../wrappers/rediswrapper').init(),
    expiretime = 86400;

exports.init = function (expressrouter) {
    /**
     * Set cache value
     */
    expressrouter.get ('/cache/set/:id/:content/:time?', function (req, res) {
        var id = req.params.id,
            content = req.params.content || '',
            time = req.params.time || expiretime;

        redis.set(id,
            content,
            function (errRedis, resRedis) {
                if (errRedis) throw errRedis;

                redis.expire(id, time);
                res.json(resRedis);
            });
    });

    /**
     * Get cache value
     */
    expressrouter.get('/cache/get/:id/', function (req, res) {
        var id = req.params.id;

        redis.get(id, function (errRedis, resRedis) {
            if (errRedis) throw errRedis;

            res.json(resRedis);
        });
    });

    /**
     * Ivalidate cache id
     */
    expressrouter.get('/cache/invalidate/:id', function (req, res) {
        var id = req.params.id;

        redis.del(id, function (errRedis, resRedis) {
            if (errRedis) throw errRedis;

            res.json(resRedis)
        });
    })
};