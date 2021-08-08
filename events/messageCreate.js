const { Message, Client } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type == 'DM') return;
        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

        if (!command) return message.reply('Böyle bir komut yok!');

        try {
            command.execute(message, args, client);
        } catch (err) {
            console.log(err);
        }
    },
};