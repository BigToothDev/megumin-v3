module.exports = async function(bot, message, Guild, config) {
    if (message.author.bot) return;
    let guild_db = await Guild.findOne({ guildID: message.guild.id });
    if (!guild_db) { return Guild.create({ guildID: message.guild.id }).then(await message.channel.send('`Server was successfully added to database! Now you can use my commands!`').then(message.delete())) };
    const prefix = guild_db.prefix;
    const {content} = message;
    if (content.slice(0, prefix.length) !== prefix) return;
    const messageArray = content.toLowerCase().split(' ');
    const command = messageArray[0].replace(prefix, "");
    const args = messageArray.slice(1);
    const messageArrayFull = content.split(' ');
    const argsF = messageArrayFull.slice(1);
    commandRun = bot.commands.get(command);
    if (commandRun) commandRun(bot, message, args, argsF)
    .catch(err => console.error(err));
}