const { EmbedBuilder } = require('discord.js');
const { formatKey, formatDataWithUnit } = require('../utils/format');

function createWeatherEmbed(weatherData) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Weather Data')
    .setDescription('Current weather data from the LoRaWAN weather station:');

  const commonAttributes = ['time', 'temp', 'humidity', 'wind'];

  let prevKey = '';

  Object.entries(weatherData).forEach(([key, data]) => {
    const formattedKey = formatKey(key);
    const formattedData = formatDataWithUnit(key, data);

    let nextCategory = true;
    let nextCategoryName = '\u200B';

    for (const attribute of commonAttributes) {
      if (!key.toLowerCase().includes(attribute)) continue;

      nextCategoryName = attribute;

      if (prevKey.toLowerCase().includes(attribute)) {
        nextCategory = false;
        break;
      }
    }

    if (nextCategory) {
      embed.addFields({ name: '\u200B', value: formatKey(nextCategoryName) + ':', inline: false });
    }

    embed.addFields({ name: formattedKey, value: formattedData, inline: true });

    prevKey = key;
  });

  embed.setTimestamp();

  return embed;
}

module.exports = createWeatherEmbed;