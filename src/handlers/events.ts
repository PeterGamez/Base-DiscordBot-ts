import { readdirSync } from "node:fs";
import { Client, ClientEvent } from "../utils/Discord";
import { ClientEvents } from "discord.js";

export default async (client: Client) => {
    let events = 0;
    ["client", "guild"].forEach((folder) => {
        readdirSync(`${__dirname}/../events/${folder}`)
            .filter((file) => file.endsWith(`.js`))
            .forEach((file) => {
                events++;
                const EventClass = require(`${__dirname}/../events/${folder}/${file}`).default;
                const event = new EventClass(client) as ClientEvent;
                const eventName = event.getName() as keyof ClientEvents;
                if (event.getOnce()) {
                    client.once(eventName, event.run.bind(null));
                } else {
                    client.on(eventName, event.run.bind(null));
                }
            });
    });
    client.log("Bot", `Loaded ${events} Client Events`);
};
