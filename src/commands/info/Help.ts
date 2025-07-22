import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, InteractionContextType, Message, SlashCommandBuilder } from "discord.js";
import { Client, Command } from "../../utils/Discord";

export default class extends Command {
    public constructor(client: Client) {
        super(client, {
            name: "help",
            aliases: [],
            description: "Help command",
            category: "info",
            usage: "$0 [command]",
            userPerms: [],
            clientPerms: [],
            owner: false,
        });
    }

    public override applicationCommands() {
        return new SlashCommandBuilder()
            .setName(super.getName())
            .setDescription(super.getDescription())
            .addStringOption((option) => option.setName("command").setDescription("Command").setAutocomplete(true).setRequired(false))
            .setContexts([InteractionContextType.Guild]);
    }

    public override async chatInputRun(interaction: ChatInputCommandInteraction<"cached">) {
        const command = interaction.options.getString("command");

        this.execute(interaction, interaction.member, { command });
    }

    public override async messageRun(message: Message<true>, args: Array<string>) {
        const command = args[0] ? args[0] : null;

        this.execute(message, message.member, { command });
    }

    private async execute(message: Message | ChatInputCommandInteraction<"cached">, member: GuildMember, { command }: { command: string }): Promise<void> {
        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if (!cmd) {
                message.reply({
                    embeds: [new EmbedBuilder().setColor("Red").setTitle("Command Not Found")],
                });
                return;
            }
            if (cmd.getOwner()) {
                if (!this.client.config.owner.includes(member.user.id)) {
                    message.reply({
                        embeds: [new EmbedBuilder().setColor("Red").setTitle("Command Not Found")],
                    });
                    return;
                }
            }

            const prefix = "cmd" in message ? this.client.config.prefix : "/";

            const embed = new EmbedBuilder()
                .setColor(this.client.config.color)
                .setAuthor({ name: this.client.user.username, iconURL: this.client.user.avatarURL({ forceStatic: true }), url: this.client.config.support.url })
                .setTitle(cmd.getName())
                .setDescription(`**${cmd.getDescription()}**`)
                .addFields(
                    { name: `Category`, value: `<:right:1332648956303245404> ${cmd.getCategory()}`, inline: true },
                    { name: `Aliases`, value: `<:right:1332648956303245404> ${cmd.getAliases().length > 0 ? cmd.getAliases().join(", ") : `None`}`, inline: true },
                    {
                        name: `Usage`,
                        value: `\`\`\`
${(cmd.getUsage() || "$0").replace("$0", prefix + cmd.getName())}
\`\`\``,
                        inline: false,
                    }
                )
                .setFooter({ text: "All Time", iconURL: this.client.config.copyright.logo })
                .setTimestamp();

            message.reply({ embeds: [embed] });
        } else {
            const commands: { [key: string]: Array<string> } = {};
            this.client.commands.forEach((cmd) => {
                if (cmd.getOwner()) {
                    if (!this.client.config.owner.includes(member.user.id)) return;
                }

                const category = cmd.getCategory();
                if (!commands[category]) commands[category] = [];
                commands[category].push(`\`${cmd.getName()}\``);
            });

            const sortedCommands = Object.keys(commands).sort((a, b) => a.localeCompare(b));

            const command = sortedCommands
                .map((category) => {
                    return `**${category}**\n${commands[category].join(", ")}`;
                })
                .join("\n\n");

            const embed = new EmbedBuilder()
                .setColor(this.client.config.color)
                .setDescription(
                    `${command}
    
[Terms of Service](https://docs.alltime.in.th/terms-of-service) [Privacy Policy](https://docs.alltime.in.th/privacy-policy)`
                )
                .setFooter({ text: "All Time", iconURL: this.client.config.copyright.logo })
                .setTimestamp();

            message.reply({ embeds: [embed] });
        }
    }
}
