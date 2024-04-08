import { Message, PermissionFlagsBits } from "discord.js";
import { Client } from "../../utils/Discord";

export default async (client: Client, message: Message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(client.config.prefix)) {

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command)
        if (!cmd) return;

        if (cmd.config?.onlyServerAdmin && !message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
        cmd.run(client, message, args)
    }
}