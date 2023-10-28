import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { Client } from "../types/Discord";

export default async (client: Client) => {
    client.components = new Collection()
    
    readdirSync(`${__dirname}/../components`).forEach(folder => {
        client.components.set(folder, new Collection())
        readdirSync(`${__dirname}/../components/${folder}`).filter(file => file.endsWith(`.js`)).forEach(file => {
            const component = require(`${__dirname}/../components/${folder}/${file}`).default
            client.components.get(folder).set(file.split(`.`)[0], component)
        })
    })
    let text = client.components.map((V, K) => `${V.size} ${K}`).join(", ")
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Loaded ${text}`)
}