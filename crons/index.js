/**
 * Created by chadsfather on 24/4/16.
 */
exports.init = function (config) {
    Object.keys(config).forEach(function (k) {
        global[k](config[k]);
    });
};

/**
 * Cron for send verification mail
 *
 * @param timer
 */
global.sendVerificationMail = function (timer) {
    require('./sendVerificationMail.js').init(timer);
};

