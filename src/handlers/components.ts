import { readdirSync } from "node:fs";
import { Client, Component } from "../utils/Discord";

export default async (client: Client) => {
    readdirSync(`${__dirname}/../components`).forEach((folder) => {
        readdirSync(`${__dirname}/../components/${folder}`)
            .filter((file) => file.endsWith(`.js`))
            .forEach((file) => {
                const ComponentClass = require(`${__dirname}/../components/${folder}/${file}`).default;
                const component = new ComponentClass(client) as Component;
                const cmd = component.getName();
                client.components.set(cmd, component);
            });
    });
    client.log("Bot", `Loaded ${client.components.size} Components`);
};
