/**
 * Created by chadsfather on 28/12/15.
 */

var mongoose = require('mongoose');
    //  autoIncrement = require('mongoose-auto-increment');

var UserSchema = mongoose.Schema({
     '_id': 'Number',
     'user': 'String',
     'password': 'String',
     'role': 'String'
});

// autoIncrement.initialize(mongoose.connect('mongodb://welkomiapp:appwelkomi2015@ds047782.mongolab.com:47782/heroku_4bzldjht'));

// UserSchema.plugin(autoIncrement.plugin, 'User');

exports.modelo = function(modelo) {
     var modelos = {
          'User': mongoose.model('User', UserSchema)
     };

     return modelos[modelo];
};
