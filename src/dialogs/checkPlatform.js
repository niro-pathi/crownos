const _ = require('lodash');
var fs = require('fs');

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('VIK_Status', (session) => {
     session.send('Hi there, \%s\. I am Corion, Your Crown Connect Assistance. How can I help you today.', session.message.user.name);
})

.onDefault((session) => {
    session.send("Sorry, this may be beyond my abilities at the moment.Try asking for 'help'");
});

bot.dialog('/intents', intents);    