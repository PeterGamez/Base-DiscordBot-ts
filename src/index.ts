import { ActivityType } from "discord.js";
import { Client } from "./utils/Discord";

const client = new Client({
    intents: ["Guilds", "GuildIntegrations", "GuildMessages", "MessageContent"],
    allowedMentions: { parse: ["users", "roles"], repliedUser: false },
    presence: { activities: [{ name: "All Time Support", type: ActivityType.Watching }] },
});

run();
async function run() {
    ["commands", "components", "events"].forEach((handler) => {
        require(`./handlers/${handler}`).default(client);
    });

    client.login(client.config.token);
}
