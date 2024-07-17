const net = require("net");

const PORT = 8940;

module.exports = {
    get_markov: async() => {
        return new Promise((resolve, reject) => {
            let myData = "";
            const client = net.createConnection({ port: PORT }, () => {
                client.once("data", (data) => {
                    myData = data;
                    client.end();
                    resolve(myData);
                });
            });
    
            client.on("end", () => {});
    
            client.on("error", (err) => {
                client.end();
                reject(err);
            });
        });
    }
}

let final = ""

//markov()
//    .then((data) => {
//        final = data.toString()
//    })
//    .catch((err) => {
//        final = null
//    })
//    .finally(() => {
//        console.log(final || "no data")
//    })
