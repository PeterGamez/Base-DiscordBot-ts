import { Client as ClientType, Collection } from "discord.js";

export class Client extends ClientType {
    constructor(config) {
        super(config)
    }
    commands: Collection<string, any>
    slashs: Collection<string, any>
    components: Collection<string, Collection<string, any>>
}