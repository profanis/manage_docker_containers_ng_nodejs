require("dotenv").config();

import { Request, Response } from "express";
import * as http from "http";

import app from "./app";


const port = process.env.APP_PORT;

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

export default server;
