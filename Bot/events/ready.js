const {Events} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Logged in as ${client.user.tag}!`);
        console.log('Bot is connected to Discord!');
    }
}