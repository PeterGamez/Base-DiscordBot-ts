import { Client as ClientType, Collection } from "discord.js";
import config from "../config";

export class Client extends ClientType {
    constructor(config) {
        super(config)
    }
    config = config
    commands: Collection<string, any>
    slashs: Collection<string, any>
    components: Collection<string, Collection<string, any>>
}