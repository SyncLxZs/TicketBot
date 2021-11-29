const DatabaseManager = require('denky-db');

module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "Desculpe voce nao tem a permissao de \`Gerenciar Servidor\` para executar este comando!" });
    const Database = new DatabaseManager('./Database/config.json');
    if(!Database.exists(message.guild.id)) return message.reply({ content: "Desculpe, mas nao foi configurado um canal de tickets neste servidor!" });
    const channel = Database.get(`${message.guild.id}`).channel;
    const msg = Database.get(`${message.guild.id}`).msg;
    let msg1 = await message.guild.channels.cache.get(channel).messages.fetch(msg);
    if(!msg1) {
        Database.delete(message.guild.id);
        message.reply({ content: "Canal de ticket removido com sucesso!"});
        return;
    }
    msg1.delete();
    Database.delete(message.guild.id);
    message.reply({ content: "Canal de ticket removido com sucesso!"});
    
}