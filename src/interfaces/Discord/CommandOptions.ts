import { PermissionResolvable } from "discord.js";

export interface CommandOptions {
    name: string;
    aliases: Array<string>;
    description: string;
    category: string;
    usage: string;
    userPerms: PermissionResolvable;
    clientPerms: PermissionResolvable;
    owner: boolean;
}
