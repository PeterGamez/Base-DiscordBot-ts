import { ChatInputCommandInteraction, EmbedBuilder, InteractionContextType, Message, SlashCommandBuilder } from "discord.js";
import { Client, Command } from "../../utils/Discord";

export default class extends Command {
    public constructor(client: Client) {
        super(client, {
            name: "ping",
            aliases: [],
            description: "Bot details",
            category: "info",
            usage: "$0",
            userPerms: [],
            clientPerms: [],
            owner: false,
        });
    }

    public override applicationCommands() {
        return new SlashCommandBuilder().setName(super.getName()).setDescription(super.getDescription()).setContexts([InteractionContextType.Guild]);
    }

    public override async chatInputRun(interaction: ChatInputCommandInteraction<"cached">) {
        const now = Date.now();

        await interaction.reply({ embeds: [new EmbedBuilder().setColor(this.client.config.color).setTitle("Loading...")], withResponse: true });

        const ping1 = now - interaction.createdTimestamp;
        const ping2 = Math.round(this.client.ws.ping);

        interaction.editReply({ content: null, embeds: [this.embedBuild(ping1, ping2)] }).catch(() => {});
    }

    public override async messageRun(message: Message<true>, args: Array<string>) {
        const msg = await message.reply({ embeds: [new EmbedBuilder().setColor(this.client.config.color).setTitle("Loading...")] });

        const ping1 = msg.createdTimestamp - message.createdTimestamp;
        const ping2 = Math.round(this.client.ws.ping);

        msg.edit({ content: null, embeds: [this.embedBuild(ping1, ping2)] }).catch(() => {});
    }

    private embedBuild(ping1: number, ping2: number): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(this.client.config.color)
            .setAuthor({ name: this.client.user.username, iconURL: this.client.user.avatarURL({ forceStatic: true }), url: this.client.config.support.url })
            .addFields(
                {
                    name: `Ping API ${ping1 < 500 ? "<:online:967050074779697183>" : "<:dnd:968414626213687296>"}`,
                    value: `**${ping1} ms**`,
                    inline: true,
                },
                {
                    name: `Ping WS ${ping2 < 300 ? "<:cloud2:967260886022627398>" : "<:cloud0:967050074641285141>"}`,
                    value: `**${ping2} ms**`,
                    inline: true,
                }
            )
            .setFooter({ text: "All Time", iconURL: this.client.config.copyright.logo })
            .setTimestamp();
    }
}
