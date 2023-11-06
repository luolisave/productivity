/**
 * Install windows 10/11 service
 * run command : 
 *   1.  npm install node-windows
 *   2.  node .\nodeService.js
 */

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Local Express 2023',
  description: 'Lis local bookmark and notes server.',
  script: 'C:\\workspace\\SimpleStorage5\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();