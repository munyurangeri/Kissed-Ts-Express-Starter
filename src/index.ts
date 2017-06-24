/**
 * Starting Express server
 */

import * as server from "./server";
import * as http from 'http';
import { config } from "dotenv"

config();

const dbUrl = process.env.LIVE_DB;

const xs = http.createServer(server.server(dbUrl));

xs.listen(process.env.PORT || 3000, () => {
  console.log('Listening on *:3000! or '+process.env.PORT+' --- '+ process.env.consumer_key);
});