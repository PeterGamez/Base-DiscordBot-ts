import { EmbedBuilder, Events, Message } from "discord.js";
import { Client, ClientEvent } from "../../utils/Discord";

export default class extends ClientEvent {
    public constructor(client: Client) {
        super(client, {
            name: Events.MessageCreate,
            once: false,
        });
    }

    public override async run(message: Message) {
        if (message.author.bot) return;

        if (message.content.startsWith(this.client.config.prefix)) {
            const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName));
            if (!command) return;

            this.client.log("Command", `(${message.guild.id} | ${message.author.id}) | ${commandName} ${args.join(" ")}`);

            if (command.getOwner()) {
                if (!this.client.config.owner.includes(message.author.id)) {
                    return;
                }
            }
            if (command.getUserPerms()) {
                if (!message.member.permissions.has(command.getUserPerms())) {
                    return message.reply({
                        embeds: [new EmbedBuilder().setColor("Red").setTitle("You do not have permission to use this command!")],
                    });
                }
            }
            if (command.getClientPerms()) {
                if (!message.guild.members.me.permissions.has(command.getClientPerms())) {
                    return message.reply({
                        embeds: [new EmbedBuilder().setColor("Red").setTitle("I do not have permission to execute this command!")],
                    });
                }
            }

            command.messageRun(message, args);
        }
    }
}
