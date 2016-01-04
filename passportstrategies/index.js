/**
 * Created by chadsfather on 28/12/15.
 */
var strategy = require('passport-local').Strategy,
    models = require("./../models");

module.exports = new strategy(function (username, password, callback) {
    console.log('------------------------------------');
    console.log(username);
    console.log(password);
    console.log('------------------------------------');

    models.modelo('User')
        .find({
            'username': username,
            'password': password
        })
        .exec(function (err, res) {
            if (err) return callback(err)
            if (!user) return callback(null, false);
            if (user.password != password) return callback(null, false);

            return callback(null, res);
        })
});
