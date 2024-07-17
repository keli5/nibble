const { PrismaClient } = require("@prisma/client");
const Eris = require("eris");
const { isModuleEnabled } = require("../../../util/moduleUtil");
const prisma = new PrismaClient()

module.exports = {
    /**
     * 
     * @param {Eris.Client} client 
     * @param {Eris.Message} message 
     * @returns 
     */
    async handle(client, message) {
        let enabled = await isModuleEnabled(message.guildID, this.module)
        if (!enabled) return
        if (message.author.bot) return;
        if (message.channel.type == undefined) return;
        
        let channelObject = await prisma.channel.upsert({
            where: {
                id: message.channel.id
            },
            create: {
                id: message.channel.id,
                guildId: message.guildID
            },
            update: {}
        })

        if (!channelObject.markovAllowed && !message.mentions.includes(client.user)) return;

        let markov = null
        let error = null
        client.getMarkov().then((data) => {
            markov = data.toString()
        })
        .catch((err) => {
            markov = null
            error = null
        })
        .finally(() => {
            if (markov == null) {
                console.error(`Markov failed: ${err}`)
            } else {
                message.channel.createMessage(markov)
            }
        })


    }
}