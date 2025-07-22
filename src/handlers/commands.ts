import { readdirSync } from "node:fs";
import { Client, Command } from "../utils/Discord";

export default async (client: Client) => {
    readdirSync(`${__dirname}/../commands`).forEach((folder) => {
        readdirSync(`${__dirname}/../commands/${folder}`)
            .filter((file) => file.endsWith(`.js`))
            .forEach((file) => {
                const CommandClass = require(`${__dirname}/../commands/${folder}/${file}`).default;
                const command = new CommandClass(client) as Command;
                const cmd = command.getName();
                client.commands.set(cmd, command);
            });
    });
    client.log("Bot", `Loaded ${client.commands.size} Commands`);
};
