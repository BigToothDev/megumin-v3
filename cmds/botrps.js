const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');
const Guild = require("./schems/guild.js");
const talkedRecently = new Set();
const wait = require('node:timers/promises').setTimeout;

module.exports = async (bot, message, args, argsF) => {
  if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
  if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('**Something went wrong! Cannot work properly: missing permission MANAGE_MESSAGES!**').catch(error => console.log(error));
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { return Guild.create({ guildID: message.guild.id }).then(message.channel.send('**Adding server to database... Repeat command!**')) };
  if (guild_db.entertModule == false) return;
  if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
  const player = message.author.id;
  if (talkedRecently.has(player)) {
    message.channel.send(`<@${player}**, wait 60 seconds before using this command again!**`).catch(error => console.log(error));
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
      .setTitle(`Waiting for you 30 sec...`)
      .setDescription(`<@${player}> pick a rock or paper, or scissors`);
    const msg = await message.channel.send({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
    const collector = await msg.createMessageComponentCollector({ time: 30000 }).catch(error => console.log(error));
    collector.on('collect', async interaction => {
      if (interaction.user.id == player) {
        interaction.reply({ content: '**Here`s results!**', ephemeral: true });
        brow.components[0].setDisabled(true);
        brow.components[1].setDisabled(true);
        brow.components[2].setDisabled(true);
        talkedRecently.add(player);
        if (interaction.customId == "rock") {
          if (botpick == '🗿') {
            collector.stop();
            firstemb.setTitle('Draw!').setDescription(`<@${bot.user.id}> - 🗿, <@${player}> - 🗿`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          } else if (botpick == '📄') {
            collector.stop();
            firstemb.setTitle('I won!').setDescription(`<@${bot.user.id}> - 📄, <@${player}> - 🗿`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          } else {
            collector.stop();
            firstemb.setTitle('You won!').setDescription(`<@${bot.user.id}> - ✂, <@${player}> - 🗿`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          }
        } else if (interaction.customId == "paper") {
          if (botpick == '🗿') {
            firstemb.setTitle('You won!').setDescription(`<@${bot.user.id}> - 🗿, <@${player}> - 📄`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          } else if (botpick == '📄') {
            firstemb.setTitle('Draw!').setDescription(`<@${bot.user.id}> - 📄, <@${player}> - 📄`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          } else {
            firstemb.setTitle('I won!').setDescription(`<@${bot.user.id}> - ✂, <@${player}> - 📄`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          }
        } else {
          if (botpick == '🗿') {
            firstemb.setTitle('I won!').setDescription(`<@${bot.user.id}> - 🗿, <@${player}> - ✂`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          } else if (botpick == '📄') {
            firstemb.setTitle('You won!').setDescription(`<@${bot.user.id}> - 📄, <@${player}> - ✂`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          } else {
            firstemb.setTitle('Draw!').setDescription(`<@${bot.user.id}> - ✂, <@${player}> - ✂`);
            msg.edit({ embeds: [firstemb], components: [brow] }).catch(error => console.log(error));
          }
        };
        await wait(60000);
        talkedRecently.delete(player);
      } else {
        interaction.reply({ content: '**It is not your game!**', ephemeral: true });
      }
    });
    collector.on('end', collected => {
      brow.components[0].setDisabled(true);
      brow.components[1].setDisabled(true);
      brow.components[2].setDisabled(true);
      msg.edit({ content: "**Expired**", components: [brow] }).catch(error => console.log(error));
    });
  }
}
module.exports.names = ["botrps"]