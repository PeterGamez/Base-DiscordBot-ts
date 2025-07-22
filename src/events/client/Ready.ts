import { Client, ClientEvent } from "../../utils/Discord";

export default class extends ClientEvent {
    public constructor(client: Client) {
        super(client, {
            name: "ready",
            once: true,
        });
    }

    public override async run() {
        this.client.log("Discord", `${this.client.user.username} ready!`);
    }
}
