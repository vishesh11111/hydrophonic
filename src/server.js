const app = require("./index");
const port = process.env.PORT || 4000 ;
const connect = require("./configs/db");
const http = require("http");

const server = http.createServer(app)


server.listen(port, async () => {
    try {
        await connect();
        console.log(`Connect Server ${port}`)
    } catch (error) {
        console.log("error", error)
    }
})