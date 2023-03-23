//global.Discord = require('discord.js')
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const { token } = require('./config.json');
const client = new Client({ intents: [ 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

    const channelId = '1088578017623801886';


    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      console.error('Channel not found.');
      return;
    }
    
    channel.send('Hello, world!');

});

client.on('messageCreate', (msg) => {
  console.log(`Message received: ${msg.content}`);

  if (msg.content === '!ping') {
    msg.channel.send('Pong!');
  }
});

client.login(token);