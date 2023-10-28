import { ActivityType } from "discord.js";
import { Client } from "./types/Discord";

import config from "./config";
global.config = config;

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildIntegrations',
        'GuildMessages',
        'MessageContent',
    ],
    allowedMentions: { parse: ["users", "roles"], repliedUser: false },
    presence: { activities: [{ name: "All Time Bot", type: ActivityType.Watching }] }
});

["commands", "components", "events"].forEach(handler => {
    require(`./handlers/${handler}`).default(client)
});

client.login("");