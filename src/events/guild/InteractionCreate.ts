import { Events, Interaction } from "discord.js";
import { Client, ClientEvent } from "../../utils/Discord";

export default class extends ClientEvent {
    public constructor(client: Client) {
        super(client, {
            name: Events.InteractionCreate,
            once: false,
        });
    }

    public override async run(interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const command = this.client.commands.get(interaction.commandName);
            if (!command) return;

            const parts = [interaction.commandName];

            const subGroup = interaction.options?.getSubcommandGroup(false);
            const subCommand = interaction.options?.getSubcommand(false);

            if (subGroup) parts.push(subGroup);
            if (subCommand) parts.push(subCommand);

            const commandName = parts.join(" ");

            this.client.log("Command", `(${interaction.guild.id} | ${interaction.user.id}) | ${commandName} ${interaction.options.data.map((x) => x.value).join(" ")}`);

            command.chatInputRun(interaction);
        } else if (interaction.isButton()) {
            const args = interaction.customId.includes(":") ? interaction.customId.split(":") : [interaction.customId];

            const command = this.client.components.get(args[0]);
            if (!command) return;

            const commandName = args[0];

            this.client.log("Button", `(${interaction.guild.id} | ${interaction.user.id}) | ${commandName} ${args.slice(1).join(" ")}`);

            command.buttonRun(interaction);
        } else if (interaction.isAnySelectMenu()) {
            const command = this.client.components.get(interaction.customId);
            if (!command) return;

            const commandName = interaction.customId;

            this.client.log("Button", `(${interaction.guild.id} | ${interaction.user.id}) | ${commandName}`);

            command.selectMenuRun(interaction);
        } else if (interaction.isAutocomplete()) {
            const command = this.client.components.get(interaction.commandName);
            if (!command) return;

            const parts = [interaction.commandName];

            const subGroup = interaction.options?.getSubcommandGroup(false);
            const subCommand = interaction.options?.getSubcommand(false);

            if (subGroup) parts.push(subGroup);
            if (subCommand) parts.push(subCommand);

            const commandName = parts.join(" ");

            this.client.log("AutoComplete", `(${interaction.guild.id} | ${interaction.user.id}) | ${commandName} ${interaction.options.data.map((x) => x.value).join(" ")}`);

            command.autocompleteRun(interaction);
        }
    }
}
