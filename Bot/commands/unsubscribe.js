const { SlashCommandBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const dataStorage = require('../data/dataStorage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsubscribe')
		.setDescription('Unsubscribe channel from the FHDW-Weatherstation.')
        .addChannelOption(option =>
            option.setName('channel').
                setDescription('If given, determines the channel to unsubscribe the broadcast of weather data from.').addChannelTypes(ChannelType.GuildText).setRequired(false)),
	async execute(interaction) {
        const channel = interaction.options.getChannel('channel')?? interaction.client.channels.cache.get(interaction.channelId);

        await interaction.deferReply({ephemeral: true });

        if(!channel){
            await interaction.editReply({ content: `No matching channel was found.`, ephemeral: true });
        }
        else if(!dataStorage.containsId(channel.id)){
            await interaction.editReply({ content: `The channel '${channel}'  is not in the list of subscribed channels.`, ephemeral: true });
        }else{
            dataStorage.removeData(channel.id);

            await interaction.editReply({ content: `The channel '${channel}' was removed from the list of subscribed channels.`, ephemeral: true });
        }

        await wait(8000);
        await interaction.deleteReply();
	},
};