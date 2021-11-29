module.exports = async(client, message) => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    const prefix = '!'
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ /g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if(!command) return;

    try {
        command.run(client, message, args);
    } catch(e) {
        console.log(e);
    }
}