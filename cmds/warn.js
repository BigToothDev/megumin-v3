const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require('discord.js');
const Guild = require("./schems/guild.js");
const User = require('./schems/user.js');
const config = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

module.exports = async (bot, message, args, argsF) => {
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { await Guild.create({ guildID: message.guild.id }) };
  if (guild_db.moderModule == false) return;
  async function warnProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14) {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send(elem1).catch(error => console.log(error));
    let mentioned_user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    let activatoruser = message.author.id;
    let reason = args.slice(2).join(' ') || 'None';
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    if (!message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return message.channel.send(elem2);
    if (!mentioned_user) {
      const incorr_user_msg = await message.channel.send(`<@${activatoruser}>${elem3}`);
      await wait(5000);
      await incorr_user_msg.delete().catch(error => console.log(error));
      return;
    };
    if (mentioned_user.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
      const cannot_warn_msg = await message.channel.send(`<@${activatoruser}>${elem4}`);
      await wait(5000);
      await cannot_warn_msg.delete().catch(error => console.log(error));
      return;
    };
    let user_db = await User.findOne({ guildID: message.guild.id, userID: mentioned_user.user.id });
    if (!user_db) { await User.create({ guildID: message.guild.id, userID: mentioned_user.user.id }) };
    if (args[0] == 'give') {
      user_db.warns++;
      user_db.save();
      const emb_give_server = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`⛔ <@${mentioned_user.user.id}> ${elem5} <@${activatoruser}>\n${elem6}: ${reason}`)
        .setFooter({ text: `${elem8} #${user_db.warns}` })
      const emb_give_dm = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`⛔ ${elem7}\n${elem6}: ${reason}`)
        .setFooter({ text: `${elem8} #${user_db.warns}` })
      const button_dm = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('senttodm')
            .setLabel(`${elem9} ${message.guild.name}`)
            .setEmoji('📨')
            .setStyle('SECONDARY')
            .setDisabled(true),
        );
      message.channel.send({ embeds: [emb_give_server] }).catch(error => console.log(error));
      mentioned_user.send({ embeds: [emb_give_dm], components: [button_dm] }).catch(error => console.log(error));
    } else if (args[0] == 'check') {
      const emb_check = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`⛔ <@${mentioned_user.user.id}> ${elem10} ${user_db.warns} ${elem11}`);
      message.channel.send({ embeds: [emb_check] });
    } else if (args[0] == 'set') {
      let amount = args[2];
      if (isNaN(amount)) return message.channel.send(`<@${activatoruser}>${elem12}`);
      if (amount > 999) return message.channel.send(`<@${activatoruser}>${elem12}`);
      if (amount < 0) return message.channel.send(`<@${activatoruser}>${elem12}`);
      user_db.warns = amount;
      user_db.save();
      const emb_set = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`⛔ <@${mentioned_user.user.id}> ${elem10} ${amount} ${elem13}`);
      message.channel.send({ embeds: [emb_set] });
    } else {
      return message.channel.send(`<@${activatoruser}>${elem14}`).catch(error => console.log(error));
    }
  };
  if (guild_db.language == 'eng') {
    const elem1 = config.cfg.msgs.bot_missing_perm.manage_msgs_eng;
    const elem2 = config.cfg.msgs.user_missing_perm.moderate_members_eng;
    const elem3 = config.cfg.msgs.warn.eng.incorrect_user;
    const elem4 = config.cfg.msgs.warn.eng.cannot_warn_thisuser;
    const elem5 = config.cfg.msgs.warn.eng.emb_channel;
    const elem6 = config.cfg.msgs.reason_eng;
    const elem7 = config.cfg.msgs.warn.eng.emb_dm;
    const elem8 = config.cfg.msgs.warn.eng.incident;
    const elem9 = config.cfg.msgs.warn.eng.button_dm;
    const elem10  = config.cfg.msgs.warn.eng.has;
    const elem11 = config.cfg.msgs.warn.eng.warnings;
    const elem12 = config.cfg.msgs.warn.eng.incorrect_amount;
    const elem13 = config.cfg.msgs.warn.eng.warnings_now;
    const elem14 = config.cfg.msgs.warn.eng.incorrect_action;
    warnProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14);
  } else {
    const elem1 = config.cfg.msgs.bot_missing_perm.manage_msgs_ua;
    const elem2 = config.cfg.msgs.user_missing_perm.moderate_members_ua;
    const elem3 = config.cfg.msgs.warn.ua.incorrect_user;
    const elem4 = config.cfg.msgs.warn.ua.cannot_warn_thisuser;
    const elem5 = config.cfg.msgs.warn.ua.emb_channel;
    const elem6 = config.cfg.msgs.reason_ua;
    const elem7 = config.cfg.msgs.warn.ua.emb_dm;
    const elem8 = config.cfg.msgs.warn.ua.incident;
    const elem9 = config.cfg.msgs.warn.ua.button_dm;
    const elem10 = config.cfg.msgs.warn.ua.has;
    const elem11 = config.cfg.msgs.warn.ua.warnings;
    const elem12 = config.cfg.msgs.warn.ua.incorrect_amount;
    const elem13 = config.cfg.msgs.warn.ua.warnings_now;
    const elem14 = config.cfg.msgs.warn.ua.incorrect_action;
    warnProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14);
  };
}
module.exports.names = ['warn']
