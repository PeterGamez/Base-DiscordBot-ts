import { Client } from "../../types/Discord";

export default async (client: Client) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Discord ${client.user.username} ready!`);
}