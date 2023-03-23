// 1. Set up your development environment
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const axios = require('axios');
const { token, ttnAppID, ttnApiKey } = require('./config.json');

// 2. Create a Discord bot
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const prefix = '!';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Bot is connected to Discord!');
});

client.on('message', async (msg) => {
    console.log(`Message received: ${msg.content}`);

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'weather') {
        try {
            // 3. Connect to The Things Network/Stack API
            const response = await axios.get(
                `https://eu1.cloud.thethings.network/api/v3/as/applications/${ttnAppID}/devices?limit=1`,
                {
                    headers: {
                        'Authorization': `Bearer ${ttnApiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // 4. Fetch the weather data
            const deviceID = response.data.devices[0].ids.device_id;
            const weatherData = await getDeviceData(deviceID);

            // 5. Display the weather data on Discord
            const weatherEmbed = createWeatherEmbed(weatherData);
            msg.channel.send(weatherEmbed);
        } catch (error) {
            console.error(error);
            msg.channel.send('Error fetching weather data.');
        }
    } else if (command === 'help') {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('List of available commands:')
            .addField('!weather', 'Displays current weather data from the LoRaWAN weather station.')
            .addField('!help', 'Displays this help message.');

        msg.channel.send(helpEmbed);
    }
    else {
        msg.channel.send(`Invalid command: ${command}`);
    }
});

async function getDeviceData(deviceID) {
    const response = await axios.get(
        `https://eu1.cloud.thethings.network/api/v3/as/applications/${ttnAppID}/devices/${deviceID}/packages/storage/uplink_message`,
        {
            headers: {
                'Authorization': `Bearer ${ttnApiKey}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const { decoded_payload } = response.data;
    console.log(decoded_payload);
    return {
        temperature: decoded_payload.temperature,
        humidity: decoded_payload.humidity,
        pressure: decoded_payload.pressure,
    };
}

function createWeatherEmbed(weatherData) {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Weather Data')
        .setDescription('Current weather data from the LoRaWAN weather station:')
        .addField('Temperature', `${weatherData.temperature} °C`, true)
        .addField('Humidity', `${weatherData.humidity} %`, true)
        .addField('Pressure', `${weatherData.pressure} hPa`, true)
        .setTimestamp()
        .setFooter('Weather Station LoRaWAN', client.user.avatarURL());

    return embed;
}


const channelId = '1088578017623801886';

setInterval(async () => {
  try {
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      console.error('Channel not found.');
      return;
    }
    
    channel.send('Hello, world!');
    // ... (the code for getting and displaying weather data)
  } catch (error) {
    console.error(error);
  }
}, 3600000);

client.login(token);