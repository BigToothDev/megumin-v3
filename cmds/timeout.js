const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require('discord.js');
const Guild = require("./schems/guild.js");
const config = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

module.exports = async (bot, message, args, argsF) => {
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { Guild.create({ guildID: message.guild.id }) };
  if (guild_db.moderModule == false) return;
  async function timeoutProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14, elem15) {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send(elem1).catch(error => console.log(error));
    let mentioned_user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let activatoruser = message.author.id;
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    if (!message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return message.channel.send(elem2).catch(error => console.log(error));
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return message.channel.send(elem3).catch(error => console.log(error));
    if (!mentioned_user) {
      const incorr_user_msg = await message.channel.send(`<@${activatoruser}>${elem4}`).catch(error => console.log(error));
      await wait(5000);
      await incorr_user_msg.delete().catch(error => console.log(error));
      return;
    };
    if (isNaN(args[1]) || args[1] == "") {
      const invalid_time_msg = await message.channel.send(`<@${activatoruser}>${elem5}`).catch(error => console.log(error));
      await wait(5000);
      await invalid_time_msg.delete().catch(error => console.log(error));
      return;
    };
    const timeImMs = args[1] * 60 * 1000;
    let reason = argsF.slice(2).join(' ');
    if (!reason) {
      const invalid_reason_msg = await message.channel.send(`<@${activatoruser}>${elem6}`).catch(error => console.log(error));
      await wait(5000);
      await invalid_reason_msg.delete().catch(error => console.log(error));
      return;
    };
    const embmain = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`🔇 <@${mentioned_user.user.id}> ${elem7} ${args[1]} ${elem8} <@${message.member.id}>\n${elem9} ${reason}`);
    const embdm = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`🔇 ${elem10} ${args[1]} ${elem11}\n${elem9} ${reason}`);
    const button_dm = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('senttodm')
          .setLabel(`${elem12} ${message.guild.name}`)
          .setEmoji('📨')
          .setStyle('SECONDARY')
          .setDisabled(true),
      );
    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('unmute')
          .setLabel(elem13)
          .setEmoji('🔉')
          .setStyle('DANGER'),
      );
    const buttons_done = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('umnuted')
          .setLabel(elem14)
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
          interaction.reply({ content: elem15, ephemeral: true });
          mentioned_user.timeout(null).catch(error => console.log(error));
          collector.stop();
        };
      };
    });
    collector.on('end', collected => {
      guild_msg.edit({ embeds: [embmain], components: [buttons_done] }).catch(error => console.log(error));
    });
  };
  if (guild_db.language == 'eng') {
    const elem1 = config.cfg.msgs.bot_missing_perm.manage_msgs_eng;
    const elem2 = config.cfg.msgs.user_missing_perm.moderate_members_eng;
    const elem3 = config.cfg.msgs.bot_missing_perm.moderate_members_eng;
    const elem4 = config.cfg.msgs.timeout.eng.incorrect_user;
    const elem5 = config.cfg.msgs.timeout.eng.invalid_time;
    const elem6 = config.cfg.msgs.timeout.eng.invalid_reason;
    const elem7 = config.cfg.msgs.timeout.eng.embmain_part1;
    const elem8 = config.cfg.msgs.timeout.eng.embmain_part2;
    const elem9 = config.cfg.msgs.timeout.eng.reason;
    const elem10 = config.cfg.msgs.timeout.eng.embdm_part1;
    const elem11 = config.cfg.msgs.timeout.eng.embdm_part2;
    const elem12 = config.cfg.msgs.timeout.eng.sentfrom;
    const elem13 = config.cfg.msgs.timeout.eng.removetimeout;
    const elem14 = config.cfg.msgs.timeout.eng.expired;
    const elem15 = config.cfg.msgs.timeout.eng.removedtimeout;
    timeoutProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14, elem15);
  } else {
    const elem1 = config.cfg.msgs.bot_missing_perm.manage_msgs_ua;
    const elem2 = config.cfg.msgs.user_missing_perm.moderate_members_ua;
    const elem3 = config.cfg.msgs.bot_missing_perm.moderate_members_ua;
    const elem4 = config.cfg.msgs.timeout.ua.incorrect_user;
    const elem5 = config.cfg.msgs.timeout.ua.invalid_time;
    const elem6 = config.cfg.msgs.timeout.ua.invalid_reason;
    const elem7 = config.cfg.msgs.timeout.ua.embmain_part1;
    const elem8 = config.cfg.msgs.timeout.ua.embmain_part2;
    const elem9 = config.cfg.msgs.timeout.ua.reason;
    const elem10 = config.cfg.msgs.timeout.ua.embdm_part1;
    const elem11 = config.cfg.msgs.timeout.ua.embdm_part2;
    const elem12 = config.cfg.msgs.timeout.ua.sentfrom;
    const elem13 = config.cfg.msgs.timeout.ua.removetimeout;
    const elem14 = config.cfg.msgs.timeout.ua.expired;
    const elem15 = config.cfg.msgs.timeout.ua.removedtimeout;
    timeoutProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14, elem15);
  };
}
module.exports.names = ['timeout']
