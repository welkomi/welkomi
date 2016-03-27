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

var IdiomsSchema = mongoose.Schema({
    '_id': 'Number',
    'key': 'String',
    'translates': {}
});

var LanguagesSchema = mongoose.Schema({
    '_id': 'Number',
    'languages': []
});

/**
 * Iniciamos mongo con el plugin de autoincremento
 */
autoIncrement.initialize(mongoose.connect(process.env.MONGOLAB_URI));

/**
 * Schema para usuarios
 */
UserSchema.plugin(autoIncrement.plugin, 'User');
UserSchema.plugin(passportLocalMongoose);

/**
 * Schema para idiomas
 */
IdiomsSchema.plugin(autoIncrement.plugin, 'Idioms');

/**
 * Schema para lenguages
 */
LanguagesSchema.plugin(autoIncrement.plugin, 'Languages');

exports.model = function(model) {
     var models = {
         'User': mongoose.model('User', UserSchema),
         'Idioms': mongoose.model('Idioms', IdiomsSchema),
         'Languages': mongoose.model('Languages', LanguagesSchema)
     };

     return models[model];
};
