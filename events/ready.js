const { Client } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(`Bot ${client.user.tag} Adı ile Giriş Yaptı!`);
    },
};