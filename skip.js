const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
  run: async ({ client, interaction }) => {
    const queue  = client.player.getQueue(interaction.guild.Id)

    if (!queue) return await interaction.editReply("There are no songs in the queue")

    const currentSong = queue.current

    queue.skip()
    await interaction.editReply({
      embeds: [
        new MessageEmbed().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.setThumbnail)
      ]
    })
  }
}  