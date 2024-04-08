import { readdirSync } from "fs";
import { Client } from "../utils/Discord";

export default async (client: Client) => {
    let events = 0
    
    readdirSync(`${__dirname}/../events`).forEach(folder => {
        readdirSync(`${__dirname}/../events/${folder}`).filter(file => file.endsWith(`.js`)).forEach(file => {
            events++
            const event = require(`${__dirname}/../events/${folder}/${file}`).default
            client.on(file.split(`.`)[0], event.bind(null, client))
        })
    })
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Loaded ${events} events`)
}