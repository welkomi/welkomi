/**
 * Created by chadsfather on 24/4/16.
 */

var schedule = require('node-schedule'),
    User = require('./../models').model('User');

exports.init = function (timer) {
    schedule.scheduleJob(timer, function () {
        User
            .find({
                'emailsended': false
            })
            .select('email')
            .select('username')
            .select('firstname')
            .select('lastname')
            .select('logintype')
            .select('locale')
            .exec(function (err, res) {
                if (err) throw err;

                if (res.length > 0) {
                    var nodemailer = require('nodemailer'),
                        transporter = nodemailer.createTransport('smtps://welkomicompany%40gmail.com:welkomiapp@smtp.gmail.com'),
                        EmailTemplates = require('swig-email-templates'),
                        templates = new EmailTemplates();

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

                    mailsender({
                            'to': 'chadsfather@gmail.com',
                            'from': 'welkomicompany@gmail.com',
                            'bcc': 'iraklitbz@gmail.com',
                            'subject': 'Test'
                        },
                        {
                            'username': 'Node Mailer',
                            'password': '!"\'<>&some-thing'
                        }, function(err, info) {
                            if (err) throw err;

                            console.log(info);
                    });
                }
            });
    });
};