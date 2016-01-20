/**
 * Created by chadsfather on 28/12/15.
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    '_id': 'Number',
    'username': 'String',
    'password': 'String',
    'role': 'String'
});

autoIncrement.initialize(mongoose.connect('mongodb://welkomiapp:appwelkomi2015@ds047782.mongolab.com:47782/heroku_4bzldjht'));

UserSchema.plugin(autoIncrement.plugin, 'User');
UserSchema.plugin(passportLocalMongoose);

exports.model = function(model) {
     var models = {
         'User': mongoose.model('User', UserSchema)
     };

     return models[model];
};
