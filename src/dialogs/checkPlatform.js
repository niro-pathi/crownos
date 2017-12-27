const _ = require('lodash');
var fs = require('fs');

console.log('00 Inside checkPlatform');

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps' + luisAppId + '&subscription-key=' + luisAPIKey;

console.log('10 Inside checkPlatform ' + LuisModelUrl);

 // Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

console.log('020 Inside checkPlatform ');

bot.dialog('VIK_Status', [
    function (session,args,next) {

           const msg = new builder.Message(session)
                      .addAttachment({
            //adaptive card body here with Action.submit buttons...
           });
           session.send(msg);
    }
]).triggerAction({ matches : 'VIK_Status'});
//VIK_Status is an intent in my LUIS app.