const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require('discord.js');
const Guild = require("./schems/guild.js");
const User = require('./schems/user.js');

module.exports = async (bot, message, args, argsF) => {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('**Something went wrong! Cannot work properly: missing permission MANAGE_MESSAGES!**').catch(error => console.log(error));
    let guild_db = await Guild.findOne({ guildID: message.guild.id });
    if (!guild_db) { return Guild.create({ guildID: message.guild.id }).then(message.channel.send('**Adding server to database... Repeat command!**')) };
    if (guild_db.moderModule == false) return;
    let mentioned_user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    let activatoruser = message.author.id;
    let reason = args.slice(2).join(' ') || 'None'
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('**Only ADMINISTRATORS can use this command!**');
    if (!mentioned_user) return message.channel.send('`Incorrect user!`');
    if (mentioned_user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('**I cannot warn this user!**');
    let user_db = await User.findOne({ guildID: message.guild.id, userID: mentioned_user.user.id });
    if (!user_db) { await User.create({ guildID: message.guild.id, userID: mentioned_user.user.id }) };
    if (args[0] == 'give') {
        user_db.warns++;
        user_db.save();
        const emb_give_server = new MessageEmbed()
          .setColor('#ff0000')
          .setDescription(`❗ <@${mentioned_user.user.id}> **was warned (#${user_db.warns}) by** <@${activatoruser}>\nReason: ${reason}`)
        const emb_give_dm = new MessageEmbed()
          .setColor('#ff0000')
          .setDescription(`❗ **You were warned (#${user_db.warns})**\nReason: ${reason}`)
        const button_dm = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('senttodm')
              .setLabel(`Sent from ${message.guild.name}`)
              .setEmoji('📨')
              .setStyle('SECONDARY')
              .setDisabled(true),
          );
        message.channel.send({ embeds: [emb_give_server] }).catch(error => console.log(error));
        mentioned_user.send({ embeds: [emb_give_dm], components: [button_dm] }).catch(error => console.log(error));
    } else if (args[0] == 'check') {
        const emb_check = new MessageEmbed()
          .setColor('#ff0000')
          .setDescription(`❗ <@${mentioned_user.user.id}> **has ${user_db.warns} warning(s)**`);
        message.channel.send({ embeds: [emb_check] });
    } else if (args[0] == 'set') {
        let amount = args[2];
        if (isNaN(amount)) return message.channel.send(`<@${activatoruser}>**, incorrect amount argument!**`);
        if (amount > 999) return message.channel.send(`<@${activatoruser}>**, incorrect amount argument!**`);
        if (amount < 0) return message.channel.send(`<@${activatoruser}>**, incorrect amount argument!**`);
        user_db.warns = amount;
        user_db.save();
        const emb_set = new MessageEmbed()
          .setColor('#ff0000')
          .setDescription(`❗ <@${mentioned_user.user.id}> **has ${amount} warning(s) now**`);
        message.channel.send({ embeds: [emb_set] });        
    } else {
        return message.channel.send(`<@${activatoruser}>**, incorrect action argument!**`).catch(error => console.log(error));
    }
}
module.exports.names = ['warn']