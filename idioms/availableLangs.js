/**
 * Created by chadsfather on 27/3/16.
 */

var _ = require('underscore'),
    models = require('./../models/'),
    redis = require('./../wrappers/rediswrapper').init();

exports.init = function (callback) {
    var rediskey = '___availableLangs';

    function formatLanguagesString (obj) {
        var strings = [];

        _.each(obj, function (v, k) {
            strings.push(v.key);
        });

        return strings.join('|');
    }

    redis.exists(rediskey, function (errRedis, resRedis) {
        if (errRedis) throw errRedis;

        resRedis = false;

        if (!resRedis) {
            models.model('Languages')
                .find({}, {
                    '__v': 0,
                    '_id': 0
                })
                .exec(function (err, response) {
                    if (err) throw err;

                    var languages = response[0].languages,
                        obj = {
                            'array': languages,
                            'route': '/:lang(' + formatLanguagesString(languages) + ')'
                        };

                    global[rediskey] = obj;

                    redis.set(rediskey,
                        JSON.stringify(obj),
                        function (errRedisSet, resRedisSet) {
                            if (errRedisSet) throw errRedisSet;
                        });

                    redis.expire(rediskey, 86400);

                    if (typeof callback === 'function') {
                        callback();
                    }
                });
        }

        else {
            redis.get(rediskey, function (errRedisGet, resRedisGet) {
                if (errRedisGet) throw errRedisGet;

                global[rediskey] = JSON.parse(resRedisGet);

                if (typeof callback === 'function') {
                    callback();
                }
            });
        }
    });
};