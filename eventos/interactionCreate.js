const DatabaseManger = require('denky-db');

module.exports = async (client, interaction) => {
    if(!interaction.isButton()) return;
    if(interaction.user.bot) return;

        if(interaction.customId === 'open') {
            const Database = new DatabaseManger('./Database/ticket.json');
            if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return;
            if(!interaction.guild.me.permissions.has("MANAGE_GUILD")) return;
            if(!interaction.guild.me.permissions.has("MANAGE_MEMBERS")) return;
            if(Database.exists(`${interaction.user.id} | ${interaction.guild.id}`)) return interaction.reply({ content: "Voce ja tem um ticket aberto neste servidor!", ephemeral: true})
            if(!Database.exists(`${interaction.user.id} | ${interaction.guild.id}`)) Database.set(`${interaction.user.id} | ${interaction.guild.id}`, []);
            
            let channel = await interaction.guild.channels.create(`📞 | Ticket ${interaction.user.tag}`, "text");   
            interaction.guild.roles.cache.forEach(r => { channel.permissionOverwrites.create(r, { SEND_MESSAGES: false }) });
            Database.push(`${interaction.user.id} | ${interaction.guild.id}`,  { channel: channel.id });
            interaction.reply({ content: "Ticket Criado", ephemeral: true });
        }
}