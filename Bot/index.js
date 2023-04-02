const fs = require('node:fs');
const path = require('node:path');
const dataStorage = require('./data/dataStorage');

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const createWeatherEmbed = require('./embeds/weatherEmbed');

const createMqttClient = require('./mqttHandler');
const { token, ttnAppUser, ttnAppPw, ttnAdress, ttnAppDevice } = require('./config.json');
const ttnSubTopic = 'up';


const discordClient = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

discordClient.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    discordClient.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    discordClient.once(event.name, (...args) => event.execute(...args));
  } else {
    discordClient.on(event.name, (...args) => event.execute(...args));
  }
}

discordClient.login(token);



const mqttClient = createMqttClient(ttnAppUser, ttnAppPw, ttnAdress, ttnAppDevice, ttnSubTopic, (topic, message, packet) =>{
  encodedData = JSON.parse(message)['uplink_message']['frm_payload'];
  decodedData = JSON.parse(atob(encodedData));

  const weatherEmbed = createWeatherEmbed(decodedData);

  const channelIds = dataStorage.readData();

  channelIds.forEach(channelId => {
    try {
        discordClient.channels.cache.get(channelId).send({ embeds: [weatherEmbed] });
    } catch (error) {
        dataStorage.removeData(channelId);
    }
  });
});