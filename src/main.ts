import { Server } from "./server/server";

const PORT = Number(process.env.PORT) || 8080

const server = Server.instance;
server.start(PORT);
