const { Client, Intents, Collection } = require('discord.js');  
const fs = require('fs');
const { token } = require('./config.json');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();

const commandsFiles = fs.readdirSync('./comandos').filter(z => z.endsWith('.js'));

for(command of commandsFiles) {
    const archive = require(`./comandos/${command}`);
    const name = command.split('.')[0];

    client.commands.set(name, archive);
}

const eventsFiles = fs.readdirSync('./eventos').filter(f => f.endsWith('.js'));

for(event of eventsFiles) {
    const archive = require(`./eventos/${event}`);
    const name = event.split('.')[0];

    client.on(name, archive.bind(null, client));
}

client.login(token);