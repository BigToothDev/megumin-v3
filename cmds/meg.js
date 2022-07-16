const Guild = require("./schems/guild.js");
const fetch = require('node-fetch');
module.exports = async (bot, message, args, argsF) => {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    let guild_db = await Guild.findOne({ guildID: message.guild.id });
    if (!guild_db) { return Guild.create({ guildID: message.guild.id }).then(message.channel.send('`Adding server to database... Repeat command!`')) };
    if (guild_db.entertModule == false) return;
    API_URL = 'https://api-inference.huggingface.co/models/BigTooth/Megumin-v0.2';
    let phrase = args.slice(0).join(' ') || `Hello!`;
    const payload = {
        inputs: {
            text: phrase
        }
    };
    const headers = {
        'Authorization': 'Bearer ' + process.env.HUGGINGFACE_TOKEN
    };
    message.channel.sendTyping();
    const response = await fetch(API_URL, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: headers
    });
    const data = await response.json();
    let botResponse = '';
    if (data.hasOwnProperty('generated_text')) {
        botResponse = data.generated_text;
    } else if (data.hasOwnProperty('error')) {
        botResponse = data.error;
    };
    message.channel.sendTyping();
    if (botResponse == `Model BigTooth/Megumin-v0.2 is currently loading`) {
        message.channel.send('**AI is loading! Wait 1-3 minutes and send command again!**').catch(error => console.log(error));
    } else {
        message.channel.send(botResponse).catch(error => console.log(error));
    };
}
module.exports.names = ["meg"]