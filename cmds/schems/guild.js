const mongoose = require('mongoose');
const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: `.` },
    language: { type: String, default: 'eng' },
    logchannel: { type: String, default: 'none' },
    cmdDelete: { type: Boolean, default: false },
    antiCW: { type: Boolean, default: false },
    antiLink: { type: Boolean, default: false },
    antiAllLinks: { type: Boolean, default: false },
    emotModule: { type: Boolean, default: true },
    entertModule: { type: Boolean, default: true },
    moderModule: { type: Boolean, default: true },
});
module.exports = mongoose.model("Guild", schema)
