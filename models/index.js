/**
 * Created by chadsfather on 28/12/15.
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var UserSchema = mongoose.Schema({
    '_id': 'Number',
    'username': 'String',
    'password': 'String',
    'email': 'String',
    'firstname': 'String',
    'lastname': 'String',
    'birthdayday': 'String',
    'birthdaymonth': 'String',
    'birthdayyear': 'String',
    'emailsended': {
        'type': 'Bool',
        'default': false
    },
    'emailverifyed': {
        'type': 'Bool',
        'default': false
    },
    'location': {
        'type': 'String',
        'default': null
    },
    'userfolder': {
        'type': 'String',
        'default': null
    },
    'routesfolder': {
        'type': 'String',
        'default': null
    },
    'logintype': {
        'type': 'String',
        'default': 'form'
    },
    'locale': {
        'type': 'String',
        'default': 'en'
    },
    'role': {
        'type': 'String',
        'default': 'user'
    }
});

var UserProfileSchema = mongoose.Schema({
    '_id': 'Number',
    'user_id': 'Number',
    'intro': {
        'type': 'String',
        'default': 'Escribe una breve introducción'
    },
    'about': {
        'type': 'String',
        'default': 'Cuentanos sobre ti.'
    },
    'langs': []
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

/**
 * Schema para el profile del usuario
 */
UserProfileSchema.plugin(autoIncrement.plugin, 'UserProfile');

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
         'UserProfile': mongoose.model('UserProfile', UserProfileSchema),
         'Idioms': mongoose.model('Idioms', IdiomsSchema),
         'Languages': mongoose.model('Languages', LanguagesSchema)
     };

     return models[model];
};
