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

        /**
         * Prueba de subida de una imagen en base 64 a GDRIVE
         */
        expressrouter.post('/drive/file/insert/:parents/', function (req, res) {
            var fs = require('fs'),
                gm = require('gm').subClass({'imageMagick': true}),
                img = req.body.img,
                parents = [];

            parents.push(req.params.parents);

            function _createImgInGdrive (buffer) {
                var resource = {
                        'mimeType': 'image/jpeg',
                        'name': 'test.jpg',
                        'parents': parents
                    },
                    media = {
                        'mimeType': 'imagen/jpeg',
                        //'body': new Buffer(img.replace(/data:image\/jpeg;base64,/, ''), 'base64')
                        'body': buffer
                    };

                drive.files.create({
                    'resource': resource,
                    'media': media,
                    'fields': 'id'
                }, function (err, file) {
                    if (err) {
                        res.json(err);
                    }

                    else {
                        res.json(file);
                    }
                });
            }

            gm(new Buffer(img.replace(/data:image\/jpeg;base64,/, ''), 'base64'))
                .resize(200, 200)
                .toBuffer('JPG', function (errGm, bufferGm) {
                    if (errGm) throw errGm;

                    _createImgInGdrive(bufferGm);
                });
        });
    });
};