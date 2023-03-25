const { SlashCommandBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('subscribe')
		.setDescription('Subscribe channel to the FHDW-Weatherstation.')
        .addChannelOption(option =>
            option.setName('channel').
                setDescription('If given, determines the channel to subscribe the broadcast of weather data to.').addChannelTypes(ChannelType.GuildText).setRequired(false)),
	async execute(interaction) {
        const channel = interaction.options.getChannel('channel') ?? interaction.client.channels.cache.get(interaction.channelId);

        await interaction.deferReply({ephemeral: true });

        if(!channel){
            await interaction.editReply({ content: `No matching channel was found.`, ephemeral: true });
        }
        else if(interaction.client.subbedChannels.has(channel)){
            await interaction.editReply({ content: `The channel '${channel}' is already in the list of subscribed channels.`, ephemeral: true });
        }else{
            await interaction.client.subbedChannels.add(channel);  
            await interaction.editReply({ content: `The channel '${channel}' was added to the list of subscribed channels.`, ephemeral: true });
        }

        await wait(8000);
        await interaction.deleteReply();
	},
};