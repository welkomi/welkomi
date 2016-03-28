/**
 * Created by ssanchez on 28/03/16.
 */
var google = require('googleapis'),
    keys = require('./welkomiapp-b9ac0ead06fb.json'),
    jwtclient = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/drive'],
        null
    );

exports.init = function () {
    return jwtclient;
};

exports.drive = function () {
    return google.drive('v2');
};