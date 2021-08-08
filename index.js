const {
    Client,
    Intents,
    Collection
} = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
const mongoose = require('./database/mongoose');
const fs = require('fs');
require('dotenv').config();

client.prefix = '?';
client.commands = new Collection();
client.aliases = new Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name, command);

        if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    }
})

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

mongoose.init();
client.login(process.env.TOKEN);