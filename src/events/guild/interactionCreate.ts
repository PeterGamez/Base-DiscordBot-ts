import { AnySelectMenuInteraction, ButtonInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import { Client } from "../../utils/Discord";

export default async (client: Client, interaction: ChatInputCommandInteraction | ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction) => {
    if (interaction.isChatInputCommand()) {
        const cmd = client.slashs.get(interaction.commandName)
        if (!cmd) return;

        const commandName = interaction.commandName + (interaction.options?.getSubcommand(false) ? ` ${interaction.options.getSubcommand()}` : "")
        console.log(`[${new Date().toString().split(" ", 5).join(" ")}] runSlash | (${interaction.guild.id} | ${interaction.user.id}) | ${commandName} ${interaction.options.data.map((x) => x.value).join(" ")}`)

        cmd.run(client, interaction)
    }
    else if (interaction.isButton()) {
        const cmd = client.components.get('button').get(interaction.customId)
        if (!cmd) return;

        console.log(`[${new Date().toString().split(" ", 5).join(" ")}] runButton | (${interaction.guild.id} | ${interaction.user.id}) | ${interaction.customId}`)

        cmd.run(client, interaction)
    }
    else if (interaction.isModalSubmit()) {
        const cmd = client.components.get('modal').get(interaction.customId)
        if (!cmd) return;

        console.log(`[${new Date().toString().split(" ", 5).join(" ")}] runModal | (${interaction.guild.id} | ${interaction.user.id}) | ${interaction.customId}`)

        cmd.run(client, interaction)
    }
    else if (interaction.isAnySelectMenu()) {
        const cmd = client.components.get('selectmenu').get(interaction.customId)
        if (!cmd) return;

        console.log(`[${new Date().toString().split(" ", 5).join(" ")}] runSelectMenu | (${interaction.guild.id} | ${interaction.user.id}) | ${interaction.customId}`)
        
        cmd.run(client, interaction)
    }
}