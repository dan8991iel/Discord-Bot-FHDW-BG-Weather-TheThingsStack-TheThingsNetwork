const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js');
const dataStorage = require('./data/dataStorage');
const { EmbedBuilder , Client, Collection, GatewayIntentBits } = require('discord.js');
const mqtt = require('mqtt');
const { token, ttnAppUser, ttnAppPw, ttnAdress , ttnAppDevice} = require('./config.json');
const { data } = require('./commands/unsubscribe');


const client = new Client({ intents: [ 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
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
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}





function createWeatherEmbed(weatherData) {
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Weather Data')
        .setDescription('Current weather data from the LoRaWAN weather station:')

    Object.entries(weatherData).forEach(([key, data]) => {
        embed.addFields({name: String(key), value: String(data), inline: true});
    });

    embed.setTimestamp();

    return embed;
}


// MQTT configuration
const mqttAppUser = ttnAppUser;
const mqttAppDevice = ttnAppDevice;
const mqttAppPw = ttnAppPw;
const mqttAdress = ttnAdress;

const mqttClient = mqtt.connect(mqttAdress, {
  username: ttnAppUser,
  password: ttnAppPw,
});

mqttClient.on('connect', () => {
  console.log('Connected to The Things Network via MQTT');

  mqttClient.subscribe(`v3/${ttnAppUser}@ttn/devices/${mqttAppDevice}/up`, {qos:2}, (err, granted) => {
    if (err) {
      console.error('Failed to subscribe:', err);
    } else {
      console.log(`Successfully subscribed to topic: ${granted[0].topic}`);
    }
  });
});

mqttClient.on('subscribe', (topic, granted) => {
    console.log(`Successfully subscribed to topic: ${topic}`);
  });

mqttClient.on('error', (error) => {
    console.error('MQTT error:', error);
  });

mqttClient.on('message', (topic, message, packet) => {
    encodedData = JSON.parse(message)["uplink_message"]["frm_payload"];
    decodedData = JSON.parse(atob(encodedData));

    const weatherEmbed = createWeatherEmbed(decodedData);
    
    const channelIds = dataStorage.readData();

    channelIds.forEach((channelId)=>{
      try{
        client.channels.cache.get(channelId).send({ embeds: [weatherEmbed] });
      }
      catch(error){
        dataStorage.removeData(channelId);
      }
    });
});



client.login(token);


/*

async function subChannelToWeatherUplink(msg, subChannel){
    if(subChannel){
        client.subbedChannels.add(msg.channelId);
    }else{
        client.subbedChannels.delete(msg.channelId);
    }
}

client.on('messageCreate', async (msg) => {
    console.log(`Message received: ${msg.content}`);

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    

    switch(command){
        case 'weather_sub': subChannelToWeatherUplink(msg, true); break;
        case 'weather_unsub': subChannelToWeatherUplink(msg, false); break;
        case 'weather_help': sendHelpMessage(msg); break;
        default: msg.channel.send(`Invalid command: ${command}`); break;
    }



    //const channel = client.channels.cache.get(value.id);


    async function sendHelpMessage(msg){
    const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('List of available commands:')
            .addFields(
                {name:'!weather', value:'Displays current weather data from the LoRaWAN weather station.'},
                {name:'!help', value:'Displays this help message.'}
            )
        msg.channel.send({ embeds: [helpEmbed] });
}
});*/