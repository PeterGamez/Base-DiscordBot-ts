import { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { ComponentOptions } from "../../interfaces/Discord";
import { Client } from "../../utils/Discord";

export abstract class Component {
    private name: ComponentOptions["name"];
    protected client: Client;

    public constructor(client: Client, options: ComponentOptions) {
        this.client = client;
        this.name = options.name;
    }

    public abstract buttonRun(interaction: ButtonInteraction): void;

    public abstract modalRun(interaction: ModalSubmitInteraction): void;

    public abstract selectMenuRun(interaction: AnySelectMenuInteraction): void;

    public abstract autocompleteRun(interaction: AutocompleteInteraction): void;

    public getName(): ComponentOptions["name"] {
        return this.name;
    }
}
