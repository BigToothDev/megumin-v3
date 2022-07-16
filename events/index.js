module.exports = (bot, mongoose, Guild) => {
    bot.on('ready', () => require('./ready')(mongoose)); 
    bot.on('messageCreate', (message) => require('./messageCreate')(bot, message, Guild));
}