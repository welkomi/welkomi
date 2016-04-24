/**
 * Created by chadsfather on 24/4/16.
 */

var schedule = require('node-schedule'),
    User = require('./../models').model('User');

exports.init = function (timer) {
    schedule.scheduleJob(timer, function () {
        User
            .find({
                'emailsended': false
            })
            .select('email')
            .select('username')
            .select('firstname')
            .select('lastname')
            .select('logintype')
            .select('locale')
            .exec(function (err, res) {
                if (err) throw err;

                console.log(res);
            });
    });
};