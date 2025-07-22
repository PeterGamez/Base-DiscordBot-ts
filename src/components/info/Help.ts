import { AnySelectMenuInteraction, ApplicationCommandOptionChoiceData, AutocompleteInteraction, ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { Client, Component } from "../../utils/Discord";

export default class extends Component {
    public constructor(client: Client) {
        super(client, {
            name: "help",
        });
    }

    public override async buttonRun(interaction: ButtonInteraction) { }

    public override async modalRun(interaction: ModalSubmitInteraction) { }

    public override async selectMenuRun(interaction: AnySelectMenuInteraction) { }

    public override async autocompleteRun(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused();

        let choices: ApplicationCommandOptionChoiceData[] = [];

        this.client.commands.forEach((command) => {
            if (command.getOwner() && this.client.config.owner.includes(interaction.user.id)) return;

            choices.push({ name: `${command.getCategory()} - ${command.getName()}`, value: command.getName() });
        });

        const filtered = choices.filter((choice) => choice.name.includes(focusedOption)).slice(0, 25);

        await interaction.respond(filtered);
    }
}
