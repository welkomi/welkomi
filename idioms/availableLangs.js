/**
 * Created by chadsfather on 27/3/16.
 */

var models = require('./../models/'),
    redis = require('./../wrappers/rediswrapper').init();

exports.init = function (callback) {
    var rediskey = '___availableLangs';

    redis.exists(rediskey, function (errRedis, resRedis) {
        if (errRedis) throw errRedis;

        if (!resRedis) {
            models.model('Languages')
                .find({}, {
                    '__v': 0,
                    '_id': 0
                })
                .exec(function (err, response) {
                    if (err) throw err;

                    var languages = response[0].languages,
                        route = languages.join('|'),
                        obj = {
                            'array': languages,
                            'route': '/:lang(' + route + ')'
                        };

                    global[rediskey] = obj;

                    redis.set(rediskey,
                        JSON.stringify(obj),
                        function (errRedisSet, resRedisSet) {
                            if (errRedisSet) throw errRedisSet;
                        });

                    redis.expire(rediskey, 86400);

                    callback();
                });
        }

        else {
            redis.get(rediskey, function (errRedisGet, resRedisGet) {
                if (errRedisGet) throw errRedisGet;

                global[rediskey] = JSON.parse(resRedisGet);

                callback();
            });
        }
    });
};