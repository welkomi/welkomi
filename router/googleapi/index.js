/**
 * Created by ssanchez on 28/03/16.
 */
var google = require('./../../wrappers/googlewrapper'),
    googleinit = google.init(),
    drive = google.drive();

exports.init = function (expressrouter) {
    expressrouter.get('/testg/', function(req, res) {
        googleinit.authorize(function (errGoogle, tokens) {
            if (errGoogle) throw errGoogle;

            drive.children.list({
                'folderId': '0B9gI2Lt4M_dxOENhek9qdVpTTDQ',
                'auth': googleinit
            }, function (errDrive, resDrive) {
                if (errDrive) throw errDrive;

                res.json(resDrive);
            });
        })
    });
};