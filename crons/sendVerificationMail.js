/**
 * Created by chadsfather on 24/4/16.
 */

var schedule = require('node-schedule'),
    User = require('./../models').model('User'),
    password = require('password-hash-and-salt'),
    strings = require('string');;

exports.init = function (timer) {
    schedule.scheduleJob(timer, function () {
        console.info('******************************** SEND VERIFY MAIL ********************************');

        var nodemailer = require('nodemailer'),
            transporter = nodemailer.createTransport('smtps://welkomicompany%40gmail.com:welkomiapp@smtp.gmail.com'),
            EmailTemplates = require('swig-email-templates'),
            templates = new EmailTemplates();

        User
            .find({
                'emailsended': false
            })
            .select('_id')
            .select('email')
            .select('username')
            .select('firstname')
            .select('lastname')
            .select('logintype')
            .select('locale')
            .exec(function (err, res) {
                if (err) throw err;

                if (res.length > 0) {
                    var mailsender = transporter.templateSender({
                        'render': function(context, callback){
                            templates.render('./../../../views/emailverification.html', context, function (err, html, text) {
                                if (err) {
                                    return callback(err);
                                }

                                callback(null, {
                                    html: html,
                                    text: text
                                });
                            });
                        }
                    });

                    res.forEach(function (i) {
                        password('account-verfication-' + i._id).hash(function (errHash, resHash) {
                            if (errHash) throw errHash;

                            var urlUser = strings(i.firstname + ' '  + i.lastname + ' ' + i._id).slugify().s,
                                locale = i.locale || 'en';

                            setLocale(locale);

                            mailsender({
                                    'to': i.email,
                                    'from': 'welkomicompany@gmail.com',
                                    //'bcc': 'iraklitbz@gmail.com',
                                    'subject': 'Email verification',
                                    'attachments': [
                                        {
                                            filename: 'image.png',
                                            content: new Buffer('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', 'base64'),
                                            cid: 'welkomi@imagemail.com'
                                        }
                                    ]
                                },
                                {
                                    'name': i.firstname + ' ' + i.lastname,
                                    'email': i.email,
                                    'urlVerification': process.env.HOST + locale + __('/profile/') + urlUser + '?account_verification=' + resHash
                                }, function (errMailer, resMailer) {
                                    if (errMailer) throw errMailer;

                                    User
                                        .update({
                                            '_id': i._id
                                        },
                                        {
                                            '$set': {
                                                'emailsended': true
                                            }
                                        }, function (errUpdate, resUpdate) {
                                            if (errUpdate) throw errUpdate;

                                            console.info(resUpdate);
                                        });
                                })
                        });
                    });
                }
            });
    });
};