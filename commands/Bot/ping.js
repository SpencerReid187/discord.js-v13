const { Message, Client } = require("discord.js");

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Pong!',
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    execute(message, args, client) {
        message.reply('Pong!');
    },
};