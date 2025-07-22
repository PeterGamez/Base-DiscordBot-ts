import { ChatInputCommandInteraction, Message, SharedSlashCommand } from "discord.js";
import { Client } from "../../utils/Discord";
import { CommandOptions } from "../../interfaces/Discord";

export abstract class Command {
    private name: CommandOptions["name"];
    private aliases: CommandOptions["aliases"];
    private description: CommandOptions["description"];
    private category: CommandOptions["category"];
    private usage: CommandOptions["usage"];
    private userPerms: CommandOptions["userPerms"];
    private clientPerms: CommandOptions["clientPerms"];
    private owner: CommandOptions["owner"];
    protected client: Client;

    public constructor(client: Client, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.aliases;
        this.description = options.description;
        this.category = options.category;
        this.usage = options.usage;
        this.userPerms = options.userPerms;
        this.clientPerms = options.clientPerms;
        this.owner = options.owner;
    }

    public abstract applicationCommands(): SharedSlashCommand;

    public abstract chatInputRun(interaction: ChatInputCommandInteraction): void;

    public abstract messageRun(message: Message, args: Array<string>): void;

    public getName(): CommandOptions["name"] {
        return this.name;
    }

    public getAliases(): CommandOptions["aliases"] {
        return this.aliases;
    }

    public getDescription(): CommandOptions["description"] {
        return this.description;
    }

    public getCategory(): CommandOptions["category"] {
        return this.category;
    }

    public getUsage(): CommandOptions["usage"] {
        return this.usage;
    }

    public getUserPerms(): CommandOptions["userPerms"] {
        return this.userPerms;
    }

    public getClientPerms(): CommandOptions["clientPerms"] {
        return this.clientPerms;
    }

    public getOwner(): CommandOptions["owner"] {
        return this.owner;
    }
}
