import { ClientEventOptions } from "../../interfaces/Discord";
import { Client } from "./Client";

export abstract class ClientEvent {
    private name: ClientEventOptions["name"];
    private once: ClientEventOptions["once"];
    protected client: Client;

    public constructor(client: Client, options: ClientEventOptions) {
        this.client = client;
        this.name = options.name;
        this.once = options.once;

        this.run = this.run.bind(this);
    }

    public abstract run(...args: Array<any>): void;

    public getName(): ClientEventOptions["name"] {
        return this.name;
    }

    public getOnce(): ClientEventOptions["once"] {
        return this.once;
    }
}
