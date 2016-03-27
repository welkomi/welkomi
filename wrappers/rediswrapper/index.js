/**
 * Created by ssanchez on 17/12/15.
 */

var redis = require('redis')
    .createClient(process.env.REDIS_URL);

redis.on('error', function (err) {
    if (err) throw err;
});

exports.init = function () {
    return redis;
};