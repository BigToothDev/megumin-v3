const { Permissions } = require('discord.js');
const Guild = require("./schems/guild.js");
const stillActive = new Set();
const prefixCollector = new Set();
const logchIDCollector = new Set();
const list = require('./config.json');

module.exports = async (bot, message, args, argsF) => {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('**Something went wrong! Cannot work properly: missing permission MANAGE_MESSAGES!**').catch(error => console.log(error));
    let guild_db = await Guild.findOne({ guildID: message.guild.id });
    if (!guild_db) { return Guild.create({ guildID: message.guild.id }).then(message.channel.send('**Adding server to database... Repeat command!**')) };
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`<@${message.member.id}>**, you cannot use this command! Not enough permissions (ADMINISTRATOR)!**`).catch(error => console.log(error));
    if (stillActive.has(message.guild.id)) {
        return message.channel.send('**Somebody is already using dashboard on this server!**').catch(error => console.log(error));
    } else {
        const activatoruser = message.author.id;
        const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
        const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
        const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
        const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
        const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
        const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
        const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
        const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
        const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
        const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
        const row = { type: 'ACTION_ROW', components: [selectmenu] };
        const msg = await message.channel.send({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
        const collector = await msg.createMessageComponentCollector({ time: 60000 }).catch(error => console.log(error));
        collector.on('collect', async interaction => {
            if (interaction.user.id == activatoruser) {
                if (interaction.customId == "smenu") {
                    if (interaction.values[0] == "emotmod") {
                        if (guild_db.emotModule == true) {
                            guild_db.emotModule = false;
                            guild_db.save();
                            interaction.reply({ content: '🎭 MODULE: Emotions was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.emotModule = true;
                            guild_db.save();
                            interaction.reply({ content: '🎭 MODULE: Emotions was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                    if (interaction.values[0] == "entertmod") {
                        if (guild_db.entertModule == true) {
                            guild_db.entertModule = false;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.entertModule = true;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                    if (interaction.values[0] == "modermod") {
                        if (guild_db.moderModule == true) {
                            guild_db.moderModule = false;
                            guild_db.save();
                            interaction.reply({ content: '🔧 MODULE: Moderation was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.moderModule = true;
                            guild_db.save();
                            interaction.reply({ content: '🔧 MODULE: Moderation was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                    if (interaction.values[0] == "elempref") {
                        if (prefixCollector.has(interaction.guild.id)) return interaction.reply({ content: 'Prefix collector is still active!', ephemeral: true });
                        if (logchIDCollector.has(interaction.guild.id)) return interaction.reply({ content: 'Another collector is still active!', ephemeral: true });
                        prefixCollector.add(interaction.guild.id);
                        await interaction.reply({ content: '**Send symbol for the new prefix (., !, ?, ;, %, +, =, -, >, ~, $) to chat!**', ephemeral: true });
                        const filterpref = m => m.author.id == activatoruser;
                        const prefcollector = interaction.channel.createMessageCollector(filterpref, { time: 10000 }).catch(error => console.log(error));
                        prefcollector.on('collect', async m => {
                            const array = list.cfg.prfx;
                            const found_symb = array.find(element => element == m.content);
                            if (!found_symb) return message.channel.send('You can not set this symbol as prefix!').catch(error => console.log(error));
                            if (guild_db.prefix == m.content) return message.channel.send('This symbol is a current prefix!').catch(error => console.log(error));
                            m.reply({ content: 'Prefix on this server was changed!', ephemeral: true }).catch(error => console.log(error));
                            prefcollector.stop();
                            guild_db.prefix = m.content;
                            guild_db.save();
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        })
                    };
                    if (interaction.values[0] == "elemlogch") {
                        if (prefixCollector.has(interaction.guild.id)) return interaction.reply({ content: 'Prefix collector is still active!', ephemeral: true });
                        if (logchIDCollector.has(interaction.guild.id)) return interaction.reply({ content: 'Another collector is still active!', ephemeral: true });
                        logchIDCollector.add(interaction.guild.id);
                        interaction.reply({ content: '**Send ID of the channel you want to make Log Channel to chat!**', ephemeral: true });
                        const filterlogcoll = m => m.author.id == activatoruser;
                        const logcollector = interaction.channel.createMessageCollector(filterlogcoll, { time: 10000 }).catch(error => console.log(error));
                        logcollector.on('collect', async m => {
                            if (m.content == 'none') {
                                guild_db.logchannel = m.content;
                                guild_db.save();
                                m.reply({ content: '📟 ELEMENT: Log Channel was changed to `none`', ephemeral: true }).catch(error => console.log(error));
                            } else {
                                let channel_log = bot.channels.cache.get(m.content);
                                if (!channel_log) {
                                    logcollector.stop();
                                    return message.channel.send('`Invalid ID! Try again!`').catch(error => console.log(error));
                                };
                                if (guild_db.logchannel == m.content) {
                                    logcollector.stop();
                                    return message.channel.send('`This channel is a current Log Channel!`').catch(error => console.log(error));
                                };
                                guild_db.logchannel = m.content;
                                guild_db.save();
                                m.reply({ content: `📟 ELEMENT: Log Channel was changed to ${channel_log.toString()}`, ephemeral: true });
                                const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                                const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                                const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                                const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                                const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                                const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                                const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                                const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                                const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                                const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                                const row = { type: 'ACTION_ROW', components: [selectmenu] };
                                await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                            };
                        });
                        logcollector.on('end', collected => {
                            logchIDCollector.delete(interaction.guild.id);
                        });
                    };
                    if (interaction.values[0] == "functautocmddel") {
                        if (guild_db.cmdDelete == true) {
                            guild_db.cmdDelete = false;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.cmdDelete = true;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                    if (interaction.values[0] == "functanticurw") {
                        if (guild_db.antiCW == true) {
                            guild_db.antiCW = false;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.antiCW = true;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                    if (interaction.values[0] == "functantidislink") {
                        if (guild_db.antiLink == true) {
                            guild_db.antiLink = false;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.antiLink = true;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                    if (interaction.values[0] == "functantialllinks") {
                        if (guild_db.antiAllLinks == true) {
                            guild_db.antiAllLinks = false;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned off!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        } else {
                            guild_db.antiAllLinks = true;
                            guild_db.save();
                            interaction.reply({ content: '📌 MODULE: Entertainment was turned on!', ephemeral: true });
                            const optionemot = { label: 'MODULE: Emotions', value: 'emotmod', description: `${guild_db.emotModule}`, emoji: '🎭' };
                            const optionentert = { label: 'MODULE: Entertainment', value: 'entertmod', description: `${guild_db.entertModule}`, emoji: '📌' };
                            const optionmod = { label: 'MODULE: Moderation', value: 'modermod', description: `${guild_db.moderModule}`, emoji: '🔧' };
                            const optionpref = { label: 'ELEMENT: Prefix', value: 'elempref', description: `Symbol: ${guild_db.prefix}`, emoji: '⚙️' };
                            const optionlog = { label: `ELEMENT: Log Channel`, value: 'elemlogch', description: `ID: ${guild_db.logchannel}`, emoji: '📟' };
                            const optionautocmddel = { label: 'FUNCTION: Auto Command Deletion', value: 'functautocmddel', description: `${guild_db.cmdDelete}`, emoji: '✂' };
                            const optionanticurse = { label: 'FUNCTION: Anti Curse Words', value: 'functanticurw', description: `${guild_db.antiCW}`, emoji: '🔞' };
                            const optionantidiscord = { label: 'FUNCTION: Anti Discord Links', value: 'functantidislink', description: `${guild_db.antiLink}`, emoji: '📎' };
                            const optionantiall = { label: 'FUNCTION: Anti All Links', value: 'functantialllinks', description: `${guild_db.antiAllLinks}`, emoji: '🖇' };
                            const selectmenu = { type: 'SELECT_MENU', customId: 'smenu', minValues: 1, maxValues: 1, options: [optionemot, optionentert, optionmod, optionpref, optionlog, optionautocmddel, optionanticurse, optionantidiscord, optionantiall] };
                            const row = { type: 'ACTION_ROW', components: [selectmenu] };
                            await msg.edit({ content: '**DASHBOARD: Select to change**', components: [row] }).catch(error => console.log(error));
                        };
                    };
                }
            } else {
                interaction.reply({ content: '**You cannot use this command or another Administrator using dashboard now!**', ephemeral: true });
            };
        });
        collector.on('end', collected => {
            msg.edit({ content: '**DASHBOARD: EXPIRED**' }).catch(error => console.log(error));
        });
    }
    stillActive.add(message.guild.id);
    setTimeout(() => {
        stillActive.delete(message.guild.id);
    }, 60000);
}
module.exports.names = ["dashboard"]