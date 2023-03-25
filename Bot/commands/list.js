const { SlashCommandBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const dataStorage = require('../data/dataStorage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Returns a list of all channels that are subscribed to the FHDW-Weatherstation.'),
	async execute(interaction) {
        await interaction.deferReply({ephemeral: true });

        const readChannelIdData = Array.from(dataStorage.readData());
        const subscribedChannels = new Array();

        
        readChannelIdData.forEach((channelId)=>{
            try{
                interaction.client.channels.cache.get(channelId).id;
                subscribedChannels.push(interaction.client.channels.cache.get(channelId));
            }catch(error){
                dataStorage.removeData(channelId);
            }
        });


        if(!subscribedChannels.length){
            await interaction.editReply({ content: `There are no channels currently subscribed to the FHDW-Weatherstation.`, ephemeral: true });
            await wait(6000);
        }else{
            subscribedChannels.sort((a, b) => (a.rawPosition > b.rawPosition) ? 1 : -1)

            let message = "The following channels are subscribed to the FHDW-Weatherstation: \n\n";


            subscribedChannels.forEach((value) => {
                message += `Channel: ${value}, ID: ${value.id}\n`;
            });
            await interaction.editReply({ content: message, ephemeral: true });
            await wait(20000);
        }
        
        await interaction.deleteReply();
	},
};