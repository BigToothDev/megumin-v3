const { MessageEmbed, Permissions } = require('discord.js');
const Guild = require("./schems/guild.js");
const config = require('./config.json');

module.exports = async (bot, message, args, argsF) => {
  let guild_db = await Guild.findOne({ guildID: message.guild.id });
  if (!guild_db) { await Guild.create({ guildID: message.guild.id }) };
  if (guild_db.emotModule == false) return;
  if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return;
  async function danceProcess(elem) {
    if (guild_db.cmdDelete == true) message.delete().catch(error => console.log(error));
    const randomWords = [
      'https://media3.giphy.com/media/b7l5cvG94cqo8/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media1.giphy.com/media/11lxCeKo6cHkJy/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media2.giphy.com/media/eZq1NxT0vHRXa/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media2.giphy.com/media/eqCaSzU2sDe8g/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media2.giphy.com/media/GYddQzjZC0kvK/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media4.giphy.com/media/YZX4FWwOJTK5W/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media0.giphy.com/media/kfZfVqxRQ39Bu/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media1.giphy.com/media/jURLx4mtSwPAY/giphy.gif?cid=82a1493bj7n4o98avr9oi4jsmcivvdvb8vofa5vd6myxn9m4&rid=giphy.gif&ct=g',
      'https://media0.giphy.com/media/EW3CTnkH6uy3K/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media1.giphy.com/media/10YWqUivkQPeeJWD3u/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media3.giphy.com/media/6k6iDdi5NN8ZO/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media4.giphy.com/media/vTqhQldEfAY6c/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media2.giphy.com/media/k7J8aS3xpmhpK/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media2.giphy.com/media/W6dHvprT7oks6BpX5R/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g',
      'https://media4.giphy.com/media/RLJxQtX8Hs7XytaoyX/giphy.gif?cid=82a1493btqstsqre0j0qwub0659abkuk0lck7bvtsa8no1ko&rid=giphy.gif&ct=g'
    ];
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const url = randomWords[randomIndex];
    const dance = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`<@${message.author.id}> ${elem}`)
      .setImage(`${url}`);
    message.channel.send({ embeds: [dance] }).catch(error => console.log(error));
  };
  if (guild_db.language == 'eng') {
    const elem = config.cfg.msgs.dance_msg_eng;
    danceProcess(elem);
  } else {
    const elem = config.cfg.msgs.dance_msg_ua;
    danceProcess(elem);
  };
}
module.exports.names = ["dance"]
