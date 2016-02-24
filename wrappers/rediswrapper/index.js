/**
 * Created by ssanchez on 17/12/15.
 */

var redis = require('redis')
    .createClient('redis://h:p2koi7dr5v9sv88g4pqm7c8vge@ec2-54-83-33-178.compute-1.amazonaws.com:6739');

redis.on('error', function (err) {
    if (err) throw err;
});

exports.init = function () {
    return redis;
};