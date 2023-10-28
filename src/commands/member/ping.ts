import { EmbedBuilder, Message } from "discord.js";
import { Client } from "../../types/Discord";

export default {
    run: async (client: Client, message: Message, args: Array<string>) => {
        const msg = await message.reply("**กำลังโหลดข้อมูล...**")

        const ping1 = msg.createdTimestamp - message.createdTimestamp
        const ping2 = Math.round(client.ws.ping)

        msg.edit({
            content: null,
            embeds: [
                new EmbedBuilder()
                    .setColor(global.config.color)
                    .setAuthor({ name: client.user.username, iconURL: message.guild.iconURL({ forceStatic: true }) })
                    .addFields(
                        { name: `Ping API`, value: `**${ping1} ms!**`, inline: true },
                        { name: `Ping WS`, value: `**${ping2} ms!**`, inline: true },
                    )
                    .setTimestamp()
                    .setFooter({ text: `ใช้คำสั่งโดย ${message.author.username}`, iconURL: message.author.avatarURL({ forceStatic: true }) })
            ]
        })
    }
}