/**
 * Created by ssanchez on 13/01/16.
 */
/**
 * Configuration for start app on HEROKU
 */

var pm2 = require('pm2'),
    instances = process.env.WEB_CONCURRENCY || -1,
    maxMemory = process.env.WEB_MEMORY || 512;

pm2.connect(function () {
   pm2.start({
           'script': 'app.js',
           'name': 'welkomi-app',
           'exec_mode': 'cluster',
           'instances': instances,
           'max_memory_restart': maxMemory + 'M',
           'env': {
               'NODE_ENV': 'development'
           }
       },
       function (err) {
           if (err) return console.error('Error while launching applications', err.stack || err);

           console.log('PM2 and application has been succesfully started');

           pm2.launchBus(function (err, bus) {
               console.log('[PM2] Log streaming started');

               bus.on('log:out', function(packet) {
                   console.log('[App:%s] %s', packet.process.name, packet.data);
               });

               bus.on('log:err', function(packet) {
                   console.error('[App:%s][Err] %s', packet.process.name, packet.data);
               });
           });
       });
});