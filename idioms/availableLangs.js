/**
 * Created by chadsfather on 27/3/16.
 */

var models = require('./../models/');

exports.init = function (callback) {
    models.model('Languages')
        .find({}, {
            '__v': 0,
            '_id': 0
        })
        .exec(function (err, response) {
            if (err) throw err;

            var languages = response[0].languages,
                route = languages.join('|');

            global.___availableLangs = {
                'array': languages,
                'route': '/:lang(' + route + ')'
            };

            callback();
        });
};