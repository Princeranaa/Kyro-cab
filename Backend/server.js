require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");
const server = http.createServer(app);

initializeSocket(server);
const PORT = process.env.PORT || 4000
const db = require("../Backend/src/config/databse");
db.connectToDb();



server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})



