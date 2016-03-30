/**
 * Created by ssanchez on 28/03/16.
 */
var credentials = process.env,
    credentials1 = require('./client_secret_258762512585-48kk76vfdnagble13bv3kn8b6u0liebn.apps.googleusercontent.com.json'),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    oauth2Client = new OAuth2(
        credentials1.web.client_id,
        credentials1.web.client_secret,
        credentials1.web.redirect_uris
    ),
    googleTokenProvider = require('refresh-token').GoogleTokenProvider,
    tokenProvider = new googleTokenProvider({
        'refresh_token': credentials.GOOGLE_API_REFRESH_TOKEN,
        'client_id': credentials1.web.client_id,
        'client_secret': credentials1.web.client_secret
    });

function validApi(name, version, accessToken, callback) {
    oauth2Client.setCredentials({
        'access_token': accessToken,
        'refresh_token': credentials.GOOGLE_API_REFRESH_TOKEN
    });

    callback(google[name]({
        'version': version,
        'auth': oauth2Client
    }));
}

exports.api = function (name, version, callback) {
    tokenProvider.getToken(function (errTokenProvider, accessToken) {
        if (errTokenProvider) throw errTokenProvider;

        validApi(name, version, accessToken, callback);
    });
};