let markovServerRunning = false;

/**
 * 
 * @param {Eris.Client} bot 
 */
module.exports = {
    async handle(bot) {
        if (!markovServerRunning) {
            server = require('child_process').spawn("python", ["./util/markov/server.py"])
            server.stdout.on("data", (data) => {
                console.log(data.toString())
            })
            markovServerRunning = true;
        }

        bot.getMarkov = require("../../../util/markov/get_markov").get_markov
    }
}