/**
 * Created by ssanchez on 28/03/16.
 */
var google = require('./../../wrappers/googlewrapper'),
    googleinit = google.init(),
    drive = google.drive();

exports.init = function (expressrouter) {
    /**
     * List files from gdrive
     */
    expressrouter.get('/drive/list/:id', function(req, res) {
        var id = req.params.id;

        googleinit.authorize(function (errGoogle, tokens) {
            if (errGoogle) throw errGoogle;

            drive.files.list({
                'q': '"' + id + '" in parents',
                'auth': googleinit
            }, function (errDrive, resDrive) {
                if (errDrive) throw errDrive;

                res.json(resDrive);
            });
        })
    });

    /**
     * Create folder in parent or root
     */
    expressrouter.get('/drive/folder/create/:parents/:name', function (req, res) {
        var name = req.params.name,
            parents = [];

        parents.push(req.params.parents);

        googleinit.authorize(function (errGoogle, tokens) {
            if (errGoogle) throw errGoogle;

            var resource = {
                'mimeType': 'application/vnd.google-apps.folder',
                'name': name,
                'parents': parents
            };

            drive.files.create({
                'resource': resource,
                'fields': 'id',
                'auth': googleinit
            }, function (errDrive, resDrive) {
                if (errDrive) throw errDrive;

                res.json(resDrive);
            });
        });
    });
};