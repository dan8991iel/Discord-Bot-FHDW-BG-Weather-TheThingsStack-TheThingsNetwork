const { SlashCommandBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const dataStorage = require('../data/dataStorage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsubscribe_all')
		.setDescription('Unsubscribe all channels from the FHDW-Weatherstation.'),
	async execute(interaction) {
        const channel = interaction.options.getChannel('channel')?? interaction.client.channels.cache.get(interaction.channelId);

        await interaction.deferReply({ephemeral: true });

        
        if(dataStorage.isEmpty()){
            await interaction.editReply({ content: `The are no channels in the list of subscribed channels.`, ephemeral: true });
        }else{
            let size = dataStorage.getSize();
            dataStorage.clearData(channel.id);
            
            await interaction.editReply({ content: `The list of subscribed channels was cleared, ${size} channel were removed.`, ephemeral: true });
        }

        await wait(8000);
        await interaction.deleteReply();
	},
};