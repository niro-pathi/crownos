const strings = require('../strings');
require('./askQuestion.js')();
require('./checkPlatform.js');

module.exports = function () {

    bot.dialog('help', 
        (session) => {

            console.log('10 Inside help ' + session.message.text);
            
            let message = '';
            if (session.message.text == 'Ask a Question') {
                message = strings.HELP_ASK_A_QUESTION;
            }
            else if (session.message.text == 'Check Platform Status') {
                message = strings.STAT_ASK_A_QUESTION;
            } else {
                let card = getHelpCard(session);
                message = new builder.Message(session).addAttachment(card);
            }
            session.endDialog(message);
        }
    )
    .triggerAction({
        matches: /^(help|h|details|want to know more\?|ask a question)$/i,
    });

    function getHelpCard(session) {
        return new builder.HeroCard()
            .title('Help')
            .text(strings.HELP_CARD_TEXT)
            .buttons([
                new builder.CardAction(session).title(strings.HELP_BUTTON_TITLE_ASK).value('Ask a Question').type('postBack'),
                new builder.CardAction(session).title(strings.STAT_BUTTON_TITLE_ASK).value('Check Platform Status').type('postBack'),
                new builder.CardAction(session).title(strings.HELP_CHECK_THE_FAQ).value(strings.FAQ_URL).type('openUrl'),
            ]);       
    }    
};