/**
 * Created by ssanchez on 17/12/15.
 */

var redis = require('redis').createClient('redis://h:p2koi7dr5v9sv88g4pqm7c8vge@ec2-107-22-174-233.compute-1.amazonaws.com:7599');

redis.on('error', function (err) {
    console.log('Error:' + err);
});

exports.init = function () {
    return redis;
};