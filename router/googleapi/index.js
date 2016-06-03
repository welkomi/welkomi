/**
 * Created by ssanchez on 28/03/16.
 */
var google = require('./../../wrappers/googlewrapper'),
    request = require('request'),
    passport = require('passport');

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
        expressrouter.post(
            '/drive/file/insert/:parents/',
            function (req, res) {
                var fs = require('fs'),
                    gm = require('gm').subClass({'imageMagick': true}),
                    parents = [],
                    ext = 'JPG',
                    height = null,
                    width = 200;

                parents.push(req.params.parents);

                function _createOrUpdateImgInGdrive (buffer, id) {
                    var resource = {
                            'mimeType': 'image/jpeg',
                            'name': req.body.name,
                            'parents': id ? null : parents
                        },
                        media = {
                            'mimeType': 'imagen/jpeg',
                            'body': buffer
                        };

                    if (id) {
                        drive.files.update({
                            'fileId': id,
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

                    else {
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
                }

                function _gmConvert (source, id) {
                    gm(source)
                        .resize(width, height)
                        .toBuffer(ext, function (errGm, bufferGm) {
                            if (errGm) throw errGm;

                            _createOrUpdateImgInGdrive(bufferGm, id);
                        });
                }

                drive.files.list({
                    'q': '"' + req.params.parents + '" in parents and trashed = false and name = "' + req.body.name + '"'
                }, function (errDrive, resDrive) {
                    if (errDrive) throw errDrive;

                    var id = null;

                    if(resDrive.files.length > 0) {
                        id = resDrive.files[0].id;
                    }

                    if (req.body.img) {
                        _gmConvert(
                            new Buffer(req.body.img.replace(/data:image\/[A-z]+;base64,/, ''), 'base64'),
                            id
                        );
                    }

                    else if (req.body.imgurl) {
                        _gmConvert(
                            request(req.body.imgurl),
                            id
                        );
                    }
                });
            });
    });
};