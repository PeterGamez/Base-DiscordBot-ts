import { readdirSync } from "fs";
import { promisify } from "util";
import { Collection, Message } from "discord.js";
import { Client } from "../../types/Discord";
const exec = promisify(require('child_process').exec);

export default {
    config: {
        onlyServerAdmin: true,
    },
    run: async (client: Client, message: Message, args: Array<string>) => {
        if (!global.config.devloper.includes(message.author.id)) return;

        const msg = await message.reply({ content: "กำลังประมวลผล" })
        exec('tsc')
            .then(() => {
                client.commands.sweep(() => true)
                client.slashs.sweep(() => true)

                const commandpath = `${__dirname}/..`
                readdirSync(commandpath).forEach(folder => {
                    readdirSync(`${commandpath}/${folder}`).filter(file => file.endsWith(`.js`)).forEach(file => {
                        delete require.cache[require.resolve(`${commandpath}/${folder}/${file}`)]
                        const command = require(`${commandpath}/${folder}/${file}`).default
                        if (command.config?.slash) client.slashs.set(command.config.slash.name, command)
                        else client.commands.set(file.split(`.`)[0], command)
                    })
                })
                const data = `Loaded ${client.commands.size} commands`
                console.log(`[${new Date().toString().split(" ", 5).join(" ")}] ${data}`)

                client.components.sweep(() => true)

                const componentpath = `${__dirname}/../../components`
                readdirSync(`${componentpath}/`).forEach(folder => {
                    client.components.set(folder, new Collection())
                    readdirSync(`${componentpath}/${folder}`).filter(file => file.endsWith(`.js`)).forEach(file => {
                        delete require.cache[require.resolve(`${componentpath}/${folder}/${file}`)]
                        const component = require(`${componentpath}/${folder}/${file}`).default
                        client.components.get(folder).set(file.split(`.`)[0], component)
                    })
                })

                const data2 = `Loaded ${client.components.map((V, K) => `${V.size} ${K}`).join(", ")}`
                console.log(`[${new Date().toString().split(" ", 5).join(" ")}] ${data2}`)

                msg.edit({ content: `รีโหลดเรียบร้อย\n${data}\n${data2}` })
            })
            .catch(e => {
                console.log(e)
                msg.edit({ content: `stdout:\n> ${e.stdout}\nstderr:\n> ${e.stderr}` })
            })
    }
}