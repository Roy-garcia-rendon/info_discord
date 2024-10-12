/**
 * ECHO POR ALEI MITCH
 */


const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

const canvafy = require("canvafy");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spotify")
        .setDescription("cartel de musica de spotify")
        .addStringOption(spotify => spotify
            .setName("author")
            .setDescription("Introduce el Author de la cancion")
            .setRequired(true)
        )
        .addStringOption(spotify => spotify
            .setName("album")
            .setDescription("Introduce el album de la cancion")
            .setRequired(true)
        )
        .addStringOption(spotify => spotify
            .setName("titulo")
            .setDescription("Introduce el titulo de la cancion")
            .setRequired(true)
        )
        .addStringOption(spotify => spotify
            .setName("imagen")
            .setDescription("Introduce la imagen de la cancion (solo .png)")
            .setRequired(false)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, message) {
        try {
            const author = interaction.options.getString("author");
            const album = interaction.options.getString("album");
            const titulo = interaction.options.getString("titulo");
            let imagen = interaction.options.getString("imagen");

            if (!imagen) {
                imagen = "https://i.scdn.co/image/ab67616d00001e02621fe38a73b2a45e9be957d3";
            } else if (!imagen.endsWith('.png') && !imagen.endsWith('.jpg') && !imagen.endsWith('.jpeg')) {
                return interaction.reply({
                    content: "Por favor, proporciona un enlace de imagen que termine en .png, .jpg, o .jpeg.",
                    ephemeral: true
                });
            }

            await interaction.deferReply();
            const spotify = await new canvafy.Spotify()
                .setAuthor(`${author}`) 
                .setAlbum(`${album}`)
                .setTimestamp(121000, 263400) 
                .setImage(imagen) 
                .setTitle(`${titulo}`)
                .setBlur(5)
                .setOverlayOpacity(0.7)
                .build();

            const embed = new EmbedBuilder()
                .setImage("attachment://spotify.png")
                .setColor("White");

            await interaction.editReply({
                embeds: [embed],
                files: [{
                    attachment: spotify,
                    name: `spotify.png`
                }]
            });

        } catch (error) {
            console.log(error);
            await interaction.editReply({ content: 'Lo siento hubo un error'})
        }
    },
};
