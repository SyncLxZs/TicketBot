const DatabaseManager = require('denky-db');
const Database = new DatabaseManager('./Database/config.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async(client, message, args) => {
    const Database = new DatabaseManager('./Database/config.json');
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "Voce nao tem a permissao necessaria para Utilizar este comando!" })
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) return message.reply({ content: 'Adicione o ID de um canal de texto ou mencione o canal de texto' });
    if(!Database.exists(`${message.guild.id}`)) {
    
    const button = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId("open")
        .setLabel("Abra seu Ticket")
        .setStyle("SUCCESS")
        .setEmoji("🎫")
    )

    const embed = new MessageEmbed();
    embed.setTitle(":ticket: | Abra seu Ticket!");
    embed.setDescription("Clique no botao abaixo e abra seu ticket imediatamente!");
    embed.setColor('#13ab92');
    let msg = await channel.send({ embeds: [embed], components: [button]});
    console.log(button)
    Database.set(`${message.guild.id}`,  { channel: channel.id, msg: msg.id, guild: message.guild.id } );
 } else {
    return message.reply({ content: "O canal de ticket ja foi configurado caso queira remove-lo use o comando \`!cofig-del\`"})
 }
};