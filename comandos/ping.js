module.exports.run = async(client, message, args) => {
    message.channel.send({ content: `${client.ws.ping}` });
}