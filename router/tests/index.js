/**
 * Created by ssanchez on 8/08/16.
 */

exports.init = function (expressrouter, idioms) {
    expressrouter.get(
        '/test/io',
        function (req, res) {
            res.render('test-io', {});
        });
};
