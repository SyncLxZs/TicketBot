const DatabaseManager = require('denky-db');
module.exports.run = async(client, message, args) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "Voce nao pode executar este comando!"});
    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "EU nao tenho a permissao de \`Controlar canais\` para executar este comando!"});

    const member = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!member) return message.reply({ content: "Por favor mencione um membro ou coloque seu ID!"} );
    const Database = new DatabaseManager('./Database/ticket.json');
    if(!Database.exists(`${member.id} | ${message.guild.id}`)) return message.reply({ content: "Este membro nao possui um ticket aberto neste servidor" });
    let channel = message.guild.channels.cache.get(Database.get(`${member.id} | ${message.guild.id}`)[0].channel);
    if(channel) channel.delete()
    Database.delete(`${member.id} | ${message.guild.id}`);
    message.reply({ content: "Ticket apagado com sucesso!"} );
}