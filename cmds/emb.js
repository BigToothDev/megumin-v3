const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');
const Guild = require("./schems/guild.js");
const config = require('./config.json');
const stillActive = new Set();
const wait = require('node:timers/promises').setTimeout;

module.exports = async (bot, message, args, argsF) => {
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { await Guild.create({ guildID: message.guild.id }) };
  if (guild_db.moderModule == false) return;
  async function embProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14, elem15) {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send(`${config.cfg.err_msgs.bot_missing_perm.manage_msgs_eng}`).catch(error => console.log(error));
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    const activatoruser = message.author.id;
    if (stillActive.has(message.guild.id)) return message.channel.send(`<@${activatoruser}>${elem1}`).catch(error => console.log(error));
    if (args[0] == 'advanced') {
      stillActive.add(message.guild.id);
      const colour_msg = await message.channel.send({ content: `<@${activatoruser}>${elem2}` }).catch(error => console.log(error));
      const filter = m => m.author.id == activatoruser;
      const collector_colour = await message.channel.createMessageCollector({ filter, time: 60000 });
      collector_colour.on('collect', async m => {
        if (/[0-9A-Fa-f]{6}/g.test(m.content)) {
          await collector_colour.stop();
          const eColour = m.content;
          await m.delete().catch(error => console.log(error));
          const title_msg = await message.channel.send({ content: `<@${activatoruser}>${elem3}` }).catch(error => console.log(error));
          const collector_title = await message.channel.createMessageCollector({ filter, time: 60000 });
          collector_title.on('collect', async m => {
            await collector_title.stop();
            const eTitle = m.content;
            await m.delete().catch(error => console.log(error));
            const description_msg = await message.channel.send({ content: `<@${activatoruser}>${elem4}` }).catch(error => console.log(error));
            const collector_description = await message.channel.createMessageCollector({ filter, time: 180000 });
            collector_description.on('collect', async m => {
              await collector_description.stop();
              const eDescription = m.content;
              await m.delete().catch(error => console.log(error));
              const buttons_footer = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId('Yesfooter')
                    .setLabel(elem5)
                    .setStyle('SUCCESS'),
                  new MessageButton()
                    .setCustomId('Nofooter')
                    .setLabel(elem6)
                    .setStyle('DANGER'),
                );
              const footer_accept_msg = await message.channel.send({ content: `<@${activatoruser}>${elem7}`, components: [buttons_footer] }).catch(error => console.log(error));
              const collector_footer_accept = await footer_accept_msg.createMessageComponentCollector({ time: 30000 });
              collector_footer_accept.on('collect', async interaction => {
                if (interaction.user.id == activatoruser) {
                  if (interaction.customId == "Yesfooter") {
                    collector_footer_accept.stop();
                    const footer_msg = await message.channel.send({ content: `<@${activatoruser}>${elem8}` }).catch(error => console.log(error));
                    const collector_footer = await message.channel.createMessageCollector({ filter, time: 60000 });
                    collector_footer.on('collect', async m => {
                      await collector_footer.stop();
                      const eFooter = m.content;
                      await m.delete().catch(error => console.log(error));
                      const buttons_thumbnail = new MessageActionRow()
                        .addComponents(
                          new MessageButton()
                            .setCustomId('Yesthu')
                            .setLabel(elem5)
                            .setStyle('SUCCESS'),
                          new MessageButton()
                            .setCustomId('Nothu')
                            .setLabel(elem6)
                            .setStyle('DANGER'),
                        );
                      const thumbnail_accept_msg = await message.channel.send({ content: `<@${activatoruser}>${elem9}`, components: [buttons_thumbnail] }).catch(error => console.log(error));
                      const collector_thumbnail_accept = await thumbnail_accept_msg.createMessageComponentCollector({ time: 30000 });
                      collector_thumbnail_accept.on('collect', async interaction => {
                        if (interaction.user.id == activatoruser) {
                          if (interaction.customId == "Yesthu") {
                            collector_thumbnail_accept.stop();
                            const thumbnail_msg = await message.channel.send({ content: `<@${activatoruser}>${elem10}` }).catch(error => console.log(error));
                            const collector_thumbnail = await message.channel.createMessageCollector({ filter, time: 60000 });
                            collector_thumbnail.on('collect', async m => {
                              if (/(https?:\/\/.*\.(?:png|jpg))/i.test(m.content)) {
                                await collector_thumbnail.stop();
                                const eThumbnail = m.content;
                                await m.delete().catch(error => console.log(error));
                                const embfin = new MessageEmbed()
                                  .setColor(`${eColour}`)
                                  .setTitle(`${eTitle}`)
                                  .setDescription(`${eDescription}`)
                                  .setThumbnail(`${eThumbnail}`)
                                  .setFooter({ text: `${eFooter}` });
                                await message.channel.send({ embeds: [embfin] });
                                await wait(180000);
                                stillActive.delete(message.guild.id);
                              } else {
                                stillActive.delete(message.guild.id);
                                await collector_thumbnail.stop();
                                m.delete().catch(error => console.log(error))
                                const err_msg = await message.channel.send(`<@${activatoruser}>${elem11}`).catch(error => console.log(error));
                                await wait(5000);
                                await err_msg.delete().catch(error => console.log(error));
                              };
                            });
                            collector_thumbnail.on('end', async collected => {
                              thumbnail_msg.delete().catch(error => console.log(error));
                            });
                          } else {
                            collector_thumbnail_accept.stop();
                            const embfin = new MessageEmbed()
                              .setColor(`${eColour}`)
                              .setTitle(`${eTitle}`)
                              .setDescription(`${eDescription}`)
                              .setFooter({ text: `${eFooter}` });
                            await message.channel.send({ embeds: [embfin] });
                            await wait(180000);
                            stillActive.delete(message.guild.id);
                          };
                        } else {
                          interaction.reply({ content: elem12, ephemeral: true });
                        };
                      });
                      collector_thumbnail_accept.on('end', async collected => {
                        thumbnail_accept_msg.delete().catch(error => console.log(error));
                      });
                    });
                    collector_footer.on('end', async collected => {
                      footer_msg.delete().catch(error => console.log(error));
                    });
                  } else {
                    collector_footer_accept.stop();
                    const buttons_thumbnail = new MessageActionRow()
                      .addComponents(
                        new MessageButton()
                          .setCustomId('Yesthu')
                          .setLabel(elem5)
                          .setStyle('SUCCESS'),
                        new MessageButton()
                          .setCustomId('Nothu')
                          .setLabel(elem6)
                          .setStyle('DANGER'),
                      );
                    const thumbnail_accept_msg = await message.channel.send({ content: `<@${activatoruser}${elem9}`, components: [buttons_thumbnail] }).catch(error => console.log(error));
                    const collector_thumbnail_accept = await thumbnail_accept_msg.createMessageComponentCollector({ time: 30000 });
                    collector_thumbnail_accept.on('collect', async interaction => {
                      if (interaction.user.id == activatoruser) {
                        if (interaction.customId == "Yesthu") {
                          collector_thumbnail_accept.stop();
                          const thumbnail_msg = await message.channel.send({ content: `<@${activatoruser}>${elem10}` }).catch(error => console.log(error));
                          const collector_thumbnail = await message.channel.createMessageCollector({ filter, time: 60000 });
                          collector_thumbnail.on('collect', async m => {
                            if (/(https?:\/\/.*\.(?:png|jpg))/i.test(m.content)) {
                              await collector_thumbnail.stop();
                              const eThumbnail = m.content;
                              m.delete().catch(error => console.log(error));
                              const embfin = new MessageEmbed()
                                .setColor(`${eColour}`)
                                .setTitle(`${eTitle}`)
                                .setDescription(`${eDescription}`)
                                .setThumbnail(`${eThumbnail}`);
                              await message.channel.send({ embeds: [embfin] });
                              await wait(180000);
                              stillActive.delete(message.guild.id);
                            } else {
                              stillActive.delete(message.guild.id);
                              await collector_thumbnail.stop();
                              m.delete().catch(error => console.log(error))
                              const err_msg = await message.channel.send(`<@${activatoruser}>${elem11}`).catch(error => console.log(error));
                              await wait(5000);
                              await err_msg.delete().catch(error => console.log(error));
                            };
                          });
                          collector_thumbnail.on('end', async collected => {
                            thumbnail_msg.delete().catch(error => console.log(error));
                          });
                        } else {
                          collector_thumbnail_accept.stop();
                          const embfin = new MessageEmbed()
                            .setColor(`${eColour}`)
                            .setTitle(`${eTitle}`)
                            .setDescription(`${eDescription}`)
                          await message.channel.send({ embeds: [embfin] });
                          await wait(180000);
                          stillActive.delete(message.guild.id);
                        };
                      } else {
                        interaction.reply({ content: elem12, ephemeral: true });
                      };
                    });
                    collector_thumbnail_accept.on('end', async collected => {
                      thumbnail_accept_msg.delete().catch(error => console.log(error));
                    });
                  };
                } else {
                  interaction.reply({ content: elem12, ephemeral: true });
                };
              });
              collector_footer_accept.on('end', async collected => {
                footer_accept_msg.delete().catch(error => console.log(error));
              });
            });
            collector_description.on('end', async collected => {
              description_msg.delete().catch(error => console.log(error));
            });
          });
          collector_title.on('end', async collected => {
            title_msg.delete().catch(error => console.log(error));
          });
        } else {
          stillActive.delete(message.guild.id);
          await collector_colour.stop();
          m.delete().catch(error => console.log(error))
          const err_msg = await message.channel.send(`<@${activatoruser}>${elem13}`).catch(error => console.log(error));
          await wait(5000);
          await err_msg.delete().catch(error => console.log(error));
        };
      });
      collector_colour.on('end', async collected => {
        colour_msg.delete().catch(error => console.log(error));
      });
    } else if (args[0] == 'simple') {
      if (!args[1] || !args[2]) {
        const err_msg = await message.channel.send(`<@${activatoruser}>${elem14}`).catch(error => console.log(error));
        await wait(5000);
        await err_msg.delete().catch(error => console.log(error));
      };
      const eDescription = args.slice(2).join(' ');
      if (/[0-9A-Fa-f]{6}/g.test(args[1])) {
        stillActive.add(message.guild.id);
        const embfin = new MessageEmbed()
          .setColor(args[1])
          .setDescription(eDescription)
        await message.channel.send({ embeds: [embfin] }).catch(error => console.log(error));
        await wait(180000);
        stillActive.delete(message.guild.id);
      } else {
        const err_msg = await message.channel.send(`<@${activatoruser}>${elem13}`).catch(error => console.log(error));
        await wait(5000);
        await err_msg.delete().catch(error => console.log(error));
      };
    } else {
      const err_msg = await message.channel.send(`<@${activatoruser}>${elem15}`).catch(error => console.log(error));
      await wait(5000);
      await err_msg.delete().catch(error => console.log(error));
    };
  };
  if (guild_db.language == 'eng') {
    const elem1 = config.cfg.msgs.emb.eng.cd;
    const elem2 = config.cfg.msgs.emb.eng.colour;
    const elem3 = config.cfg.msgs.emb.eng.title;
    const elem4 = config.cfg.msgs.emb.eng.description;
    const elem5 = config.cfg.msgs.emb.eng.yes;
    const elem6 = config.cfg.msgs.emb.eng.no;
    const elem7 = config.cfg.msgs.emb.eng.acceptfooter;
    const elem8 = config.cfg.msgs.emb.eng.footer;
    const elem9 = config.cfg.msgs.emb.eng.tnaccept;
    const elem10 = config.cfg.msgs.emb.eng.tn;
    const elem11 = config.cfg.msgs.emb.eng.incorrect_link;
    const elem12 = config.cfg.msgs.emb.eng.cannot_use;
    const elem13 = config.cfg.msgs.emb.eng.incorrect_colour;
    const elem14 = config.cfg.msgs.emb.eng.missing_var;
    const elem15 = config.cfg.msgs.emb.eng.incorrect_type;
    embProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14, elem15);
  } else {
    const elem1 = config.cfg.msgs.emb.ua.cd;
    const elem2 = config.cfg.msgs.emb.ua.colour;
    const elem3 = config.cfg.msgs.emb.ua.title;
    const elem4 = config.cfg.msgs.emb.ua.description;
    const elem5 = config.cfg.msgs.emb.ua.yes;
    const elem6 = config.cfg.msgs.emb.ua.no;
    const elem7 = config.cfg.msgs.emb.ua.acceptfooter;
    const elem8 = config.cfg.msgs.emb.ua.footer;
    const elem9 = config.cfg.msgs.emb.ua.tnaccept;
    const elem10 = config.cfg.msgs.emb.ua.tn;
    const elem11 = config.cfg.msgs.emb.ua.incorrect_link;
    const elem12 = config.cfg.msgs.emb.ua.cannot_use;
    const elem13 = config.cfg.msgs.emb.ua.incorrect_colour;
    const elem14 = config.cfg.msgs.emb.ua.missing_var;
    const elem15 = config.cfg.msgs.emb.ua.incorrect_type;
    embProcess(elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9, elem10, elem11, elem12, elem13, elem14, elem15);
  };
}
module.exports.names = ['emb']
