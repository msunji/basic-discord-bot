// this command creates a private channel
require('dotenv').config();
const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-channel')
		.setDescription('Creates a new private text channel.')
		.addStringOption(option =>
			option.setName('channel-name')
				.setDescription('The name of the channel you want to create')
				.setRequired(true),
		),
	async execute(interaction) {
		const channelName = interaction.options.getString('channel-name');
    // guildName is basically the server
		const guildName = await interaction.client.guilds.fetch(process.env.GUILD_ID);
		const everyoneRole = guildName.roles.everyone;
    try {
      await interaction.guild.channels.create({
        name: channelName,
        parent: process.env.CHANNEL_ID,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: everyoneRole,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });
      await interaction.reply({ content: `Successfully created new channel called ${channelName} 🎉` });
    } catch (error) {
      console.error(error);
    }
	},
};