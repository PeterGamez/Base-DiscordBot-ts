import { ClientOptions, Client as ClientInterface, Collection } from "discord.js";
import config from "../../config";
import { Command } from "./Command";
import { Component } from "./Component";

export class Client extends ClientInterface {
    public config = config;
    public commands = new Collection<string, Command>();
    public aliases = new Collection<string, string>();
    public components = new Collection<string, Component>();
    public cooldowns = new Collection<string, { time: number; limit?: boolean }>();

    public constructor(options: ClientOptions) {
        super(options);
    }

    public log(key: string, message: string) {
        key = `${key}`;
        if (key.length < 20) key = key.padEnd(20, " ");
        console.log(`[${this.formatDate(new Date())}] ${key} : ${message}`);
    }
    public warn(key: string, message: string) {
        key = `${key}`;
        if (key.length < 20) key = key.padEnd(20, " ");
        console.warn(`[${this.formatDate(new Date())}] ${key} : ${message}`);
    }
    public error(key: string, message: string) {
        key = `${key}`;
        if (key.length < 20) key = key.padEnd(20, " ");
        console.error(`[${this.formatDate(new Date())}] ${key} : ${message}`);
    }

    private formatDate(date: Date) {
        const pad = (n: number) => n.toString().padStart(2, "0");

        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
}
