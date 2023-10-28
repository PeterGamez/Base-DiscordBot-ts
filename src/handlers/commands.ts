import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { Client } from "../types/Discord";

export default async (client: Client) => {
    client.commands = new Collection()
    client.slashs = new Collection()
    
    readdirSync(`${__dirname}/../commands`).forEach(folder => {
        readdirSync(`${__dirname}/../commands/${folder}`).filter(file => file.endsWith(`.js`)).forEach(file => {
            const command = require(`${__dirname}/../commands/${folder}/${file}`).default
            if (command.config?.slash) client.slashs.set(command.config.slash.name, command)
            else client.commands.set(file.split(`.`)[0], command)
        })
    })
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Loaded ${client.commands.size} commands`)
}