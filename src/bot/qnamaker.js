'use strict';

global.builder = require('botbuilder');
global.botbuilder_azure = require("botbuilder-azure");

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

global.bot = new builder.UniversalBot(connector);

bot.set('storage', tableStorage);

require('../dialogs/intro.js')();
require('../dialogs/help.js')();

console.log("Inside QNA Maker ");

bot.on('contactRelationUpdate', (message) => {
    if (message.action == 'add') {
        bot.beginDialog(message.address, 'intro');
    } else if (message.action == 'remove') {
        session.endConversation();
        session.userData = {};
        session.conversationData = {};
        session.privateConversationData = {};
        session.dialogData = {};
    }
});

bot.dialog('/', [
    (session, args) => {
        session.beginDialog('Help');
    }
]);

module.exports = bot;