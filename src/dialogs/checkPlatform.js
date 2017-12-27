const _ = require('lodash');
var fs = require('fs');

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;
 // Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

console.log('Inside checkPlatform');

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