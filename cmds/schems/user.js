const mongoose = require('mongoose');
const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    
    xp: { type: Number, default: 0 },
    warns: { type: Number, default: 0 },
});
module.exports = mongoose.model("User", schema)