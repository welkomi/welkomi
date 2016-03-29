/**
 * Created by ssanchez on 28/03/16.
 */
var google = require('googleapis'),
    keys = require('./welkomiapp-b9ac0ead06fb.json'),
    jwtclient = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.appdata',
            'https://www.googleapis.com/auth/drive.apps.readonly'
        ],
        null
    );

exports.init = function () {
    return jwtclient;
};

exports.drive = function () {
    return google.drive('v3');
};