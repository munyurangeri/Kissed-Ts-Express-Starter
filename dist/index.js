"use strict";
/**
 * Starting Express server
 */
Object.defineProperty(exports, "__esModule", { value: true });
const server = require("./server");
const http = require("http");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const dbUrl = process.env.LIVE_DB;
const xs = http.createServer(server.server(dbUrl));
xs.listen(process.env.PORT || 3000, () => {
    console.log('Listening on *:3000! or ' + process.env.PORT + ' --- ' + process.env.consumer_key);
});
