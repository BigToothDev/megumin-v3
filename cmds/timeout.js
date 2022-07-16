const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require('discord.js');
const Guild = require("./schems/guild.js");

module.exports = async (bot, message, args, argsF) => {
  if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
  if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('**Something went wrong! Cannot work properly: missing permission MANAGE_MESSAGES!**').catch(error => console.log(error));
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { return Guild.create({ guildID: message.guild.id }).then(message.channel.send('**Adding server to database... Repeat command!**')) };
  if (guild_db.moderModule == false) return;
  let mentioned_user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let activatoruser = message.author.id;
  if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
  if (!message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return message.channel.send('**You cannot use this command! Not enough permissions (MODERATE_MEMBERS)**').catch(error => console.log(error));
  if (!message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return message.channel.send('**Something went wrong! Missing permissions (MODERATE_MEMBERS)!**').catch(error => console.log(error));
  if (!mentioned_user) return message.channel.send('**Incorrect user!**').catch(error => console.log(error));
  if (isNaN(args[1]) || args[1] == "") return message.channel.send('**Invalid time argument!**').catch(error => console.log(error));
  const timeImMs = args[1] * 60 * 1000;
  let reason = argsF.slice(2).join(' ');
  if (!reason) return message.channel.send('**Invalid reason argument!**').catch(error => console.log(error));
  const embmain = new MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`🔇 <@${mentioned_user.user.id}> **was timed out for ${args[1]} minutes by** <@${message.member.id}>\nReason: ${reason}`);
  const embdm = new MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`🔇 **You were timed out for ${args[1]} minutes**\nReason: ${reason}`);
  const button_dm = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('senttodm')
        .setLabel(`Sent from ${message.guild.name}`)
        .setEmoji('📨')
        .setStyle('SECONDARY')
        .setDisabled(true),
    );
  const buttons = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('unmute')
        .setLabel('Remove time out')
        .setEmoji('🔉')
        .setStyle('DANGER'),
    );
  const buttons_done = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('umnuted')
        .setLabel('Expired')
        .setStyle('SECONDARY')
        .setDisabled(true),
    );
  const guild_msg = await message.channel.send({ embeds: [embmain], components: [buttons] }).catch(error => console.log(error));
  mentioned_user.send({ embeds: [embdm], components: [button_dm] }).catch(error => console.log(error));
  mentioned_user.timeout(timeImMs, reason).catch(error => console.log(error));
  const collector = await guild_msg.createMessageComponentCollector({ time: 30000 });
  collector.on('collect', async interaction => {
    if (interaction.user.id == activatoruser) {
        if (interaction.customId == "unmute") {
          interaction.reply({ content: '**Timeout was removed!**', ephemeral: true});
          mentioned_user.timeout(null).catch(error => console.log(error));
          collector.stop();
        }
      }
  });
  collector.on('end', collected => {
    guild_msg.edit({ embeds: [embmain], components: [buttons_done] }).catch(error => console.log(error));
  });
}
module.exports.names = ['timeout']