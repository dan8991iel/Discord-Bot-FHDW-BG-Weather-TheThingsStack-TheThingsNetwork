const { SlashCommandBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Returns a list of all channels that are subscribed to the FHDW-Weatherstation.'),
	async execute(interaction) {
        await interaction.deferReply({ephemeral: true });

        const subscribers = Array.from(interaction.client.subbedChannels);

        if(!subscribers.length){
            await interaction.editReply({ content: `There are no channels currently subscribed to the FHDW-Weatherstation.`, ephemeral: true });
            await wait(6000);
        }else{
            subscribers.sort((a, b) => (a.rawPosition > b.rawPosition) ? 1 : -1)

            let message = "The following channels are subscribed to the FHDW-Weatherstation: \n\n";


            subscribers.forEach((value) => {
                message += `Name: ${value.name}, ID: ${value.id}\n`;
            });
            await interaction.editReply({ content: message, ephemeral: true });
            await wait(20000);
        }
        
        await interaction.deleteReply();
	},
};