require('dotenv').config();

const appInsights = require("applicationinsights");
const restify = require('restify');
const qnamaker = require('./src/bot/qnamaker.js');

appInsights.setup()
           .setAutoDependencyCorrelation(true)
           .setAutoCollectRequests(true)
           .setAutoCollectPerformance(true)
           .setAutoCollectExceptions(true)
           .setAutoCollectDependencies(true)
           .setAutoCollectConsole(true)
           .setUseDiskRetryCaching(true)
           .start();

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Listen for messages from users 
server.post('/api/messages', qnamaker.connector('*').listen());