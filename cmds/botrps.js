const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');
const Guild = require("./schems/guild.js");
const cd = new Set();
const config = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

module.exports = async (bot, message, args, argsF) => {
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { await Guild.create({ guildID: message.guild.id }) };
  if (guild_db.entertModule == false) return;
  async function botrpsProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10) {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send(elem1).catch(error => console.log(error));
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    const player = message.author.id;
    if (cd.has(player)) {
      const cd_msg = await message.channel.send(`<@${player}>${elem2}`).catch(error => console.log(error));
      await wait(5000);
      await cd_msg.delete().catch(error => console.log(error));
      return;
    } else {
      const randompick = ['🗿', '📄', '✂'];
      const randomIndex3 = Math.floor(Math.random() * randompick.length);
      const botpick = randompick[randomIndex3];
      const brow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('rock')
            .setEmoji('🗿')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('paper')
            .setEmoji('📄')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('scissors')
            .setEmoji('✂')
            .setStyle('SECONDARY')
        );
      const firstemb = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`${elem3}`)
        .setDescription(`<@${player}>${elem4}`);
      const msg = await message.channel.send({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
      const collector = await msg.createMessageComponentCollector({ time: 30000 });
      collector.on('collect', async interaction => {
        if (interaction.user.id == player) {
          interaction.reply({ content: `${elem5}`, ephemeral: true });
          brow.components[0].setDisabled(true);
          brow.components[1].setDisabled(true);
          brow.components[2].setDisabled(true);
          cd.add(player);
          if (interaction.customId == "rock") {
            if (botpick == '🗿') {
              collector.stop();
              firstemb.setTitle(elem7).setDescription(`<@${bot.user.id}> - 🗿, <@${player}> - 🗿`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            } else if (botpick == '📄') {
              collector.stop();
              firstemb.setTitle(elem8).setDescription(`<@${bot.user.id}> - 📄, <@${player}> - 🗿`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            } else {
              collector.stop();
              firstemb.setTitle(elem9).setDescription(`<@${bot.user.id}> - ✂, <@${player}> - 🗿`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            };
          } else if (interaction.customId == "paper") {
            if (botpick == '🗿') {
              collector.stop();
              firstemb.setTitle(elem9).setDescription(`<@${bot.user.id}> - 🗿, <@${player}> - 📄`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            } else if (botpick == '📄') {
              collector.stop();
              firstemb.setTitle(elem7).setDescription(`<@${bot.user.id}> - 📄, <@${player}> - 📄`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            } else {
              collector.stop();
              firstemb.setTitle(elem8).setDescription(`<@${bot.user.id}> - ✂, <@${player}> - 📄`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            };
          } else {
            if (botpick == '🗿') {
              collector.stop();
              firstemb.setTitle(elem8).setDescription(`<@${bot.user.id}> - 🗿, <@${player}> - ✂`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            } else if (botpick == '📄') {
              collector.stop();
              firstemb.setTitle(elem9).setDescription(`<@${bot.user.id}> - 📄, <@${player}> - ✂`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            } else {
              collector.stop();
              firstemb.setTitle(elem7).setDescription(`<@${bot.user.id}> - ✂, <@${player}> - ✂`);
              msg.edit({ embeds: [firstemb] }).catch(error => console.log(error));
            };
          };
          await wait(60000);
          cd.delete(player);
        } else {
          interaction.reply({ content: `${elem6}`, ephemeral: true });
        };
      });
      collector.on('end', collected => {
        brow.components[0].setDisabled(true);
        brow.components[1].setDisabled(true);
        brow.components[2].setDisabled(true);
        msg.edit({ content: `${elem10}`, components: [brow] }).catch(error => console.log(error));
      });
    };
  };
  if (guild_db.language == 'eng') {
    const elem1 = config.cfg.msgs.bot_missing_perm.manage_msgs_eng;
    const elem2 = config.cfg.msgs.botrps.eng.cd;
    const elem3 = config.cfg.msgs.botrps.eng.waiting;
    const elem4 = config.cfg.msgs.botrps.eng.pick;
    const elem5 = config.cfg.msgs.botrps.eng.result;
    const elem6 = config.cfg.msgs.botrps.eng.notyours;
    const elem7 = config.cfg.msgs.botrps.eng.draw;
    const elem8 = config.cfg.msgs.botrps.eng.iwon;
    const elem9 = config.cfg.msgs.botrps.eng.youwon;
    const elem10 = config.cfg.msgs.botrps.eng.expired;
    botrpsProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10);
  } else {
    const elem1 = config.cfg.msgs.bot_missing_perm.manage_msgs_ua;
    const elem2 = config.cfg.msgs.botrps.ua.cd;
    const elem3 = config.cfg.msgs.botrps.ua.waiting;
    const elem4 = config.cfg.msgs.botrps.ua.pick;
    const elem5 = config.cfg.msgs.botrps.ua.result;
    const elem6 = config.cfg.msgs.botrps.ua.notyours;
    const elem7 = config.cfg.msgs.botrps.ua.draw;
    const elem8 = config.cfg.msgs.botrps.ua.iwon;
    const elem9 = config.cfg.msgs.botrps.ua.youwon;
    const elem10 = config.cfg.msgs.botrps.ua.expired;
    botrpsProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10);
  };
}
module.exports.names = ["botrps"]
