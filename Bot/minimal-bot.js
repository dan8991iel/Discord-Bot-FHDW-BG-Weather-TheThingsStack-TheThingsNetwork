const { Client, GatewayIntentBits, Partials } = require('discord.js');

const { token } = require('./config.json');
const client = new Client({ intents: [ 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,] , partials: [Partials.Channel]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  console.log(`Message received: ${msg.content}`);

  if (msg.content === '!ping') {
    msg.channel.send('Pong!');
  }
});

client.login(token);