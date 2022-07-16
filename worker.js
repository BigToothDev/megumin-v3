const Discord = require('discord.js');
const mongoose = require('mongoose');
const Guild = require("./cmds/schems/guild.js");
const fs = require('fs');
const config = require('./cmds/config.json');
require('dotenv').config();
config.cfg.intents = new Discord.Intents(config.cfg.intents);
const bot = new Discord.Client(config.cfg);
require('./events')(bot, mongoose, Guild, config);
bot.login(process.env.TOKEN);

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(f => f.endsWith('.js'));
for  (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	command.names.forEach(el => {
		bot.commands.set(el, command)
	});
};
process.on("SIGINT", () => {
	console.log('Signed out!');
	mongoose.disconnect();
	bot.destroy();
});
console.log(bot.commands)