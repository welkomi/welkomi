/**
 * Created by ssanchez on 28/03/16.
 */
var google = require('./../../wrappers/googlewrapper');
    //googleinit = google.init(),
    //drive = google.drive();

exports.init = function (expressrouter) {
    google.api('drive', 'v3', function (drive) {
        /**
         * List files from gdrive
         */
        expressrouter.get('/drive/folder/list/:id?', function(req, res) {
            var id = req.params.id || 'root';

            drive.files.list({
                'q': '"' + id + '" in parents and trashed = false'
            }, function (errDrive, resDrive) {
                if (errDrive) throw errDrive;

                res.json(resDrive);
            });
        });

        /**
         * Create folder in parent or root
         */
        expressrouter.get('/drive/folder/create/:parents/:name', function (req, res) {
            var name = req.params.name,
                parents = [];

            parents.push(req.params.parents);

            var resource = {
                'mimeType': 'application/vnd.google-apps.folder',
                'name': name,
                'parents': parents
            };

            drive.files.create({
                'resource': resource,
                'fields': 'id, webViewLink',
            }, function (errDrive, resDrive) {
                if (errDrive) throw errDrive;

                res.json(resDrive);
            });
        });
    });
};