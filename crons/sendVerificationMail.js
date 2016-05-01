/**
 * Created by chadsfather on 24/4/16.
 */

var schedule = require('node-schedule'),
    User = require('./../models').model('User');

exports.init = function (timer) {
    schedule.scheduleJob(timer, function () {
        console.log('******************************** SEND VERIFY MAIL ********************************');

        var nodemailer = require('nodemailer'),
            transporter = nodemailer.createTransport('smtps://welkomicompany%40gmail.com:welkomiapp@smtp.gmail.com'),
            EmailTemplates = require('swig-email-templates'),
            templates = new EmailTemplates();

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
                            'to': res[0].email,
                            'from': 'welkomicompany@gmail.com',
                            'bcc': 'iraklitbz@gmail.com',
                            'subject': 'Email verification'
                        },
                        {
                            'name': res[0].firstname + ' ' + res[0].lastname,
                            'email': res[0].email
                        }, function(err, info) {
                            if (err) throw err;

                            console.log(info);
                    });
                }
            });
    });
};