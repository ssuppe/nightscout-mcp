/**
 * @file This is the main entry point for the Nightscout MCP server.
 * It sets up the Express server and defines the MCP tools.
 */

import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { JSONRPCServer } from 'json-rpc-2.0';
import { NightscoutClient } from './services/nightscoutClient';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize the Nightscout client
const nightscoutUrl = process.env.NIGHTSCOUT_URL;
const nightscoutToken = process.env.NIGHTSCOUT_TOKEN;

if (!nightscoutUrl || !nightscoutToken) {
  throw new Error('NIGHTSCOUT_URL and NIGHTSCOUT_TOKEN must be set in the environment variables.');
}

const nightscoutClient = new NightscoutClient(nightscoutUrl, nightscoutToken);

const server = new JSONRPCServer();

// Add the get_entries method to the JSON-RPC server
server.addMethod("get_entries", async ({ count, find }) => {
  return await nightscoutClient.getEntries(count, find);
});

app.post("/", (req: Request, res: Response) => {
  const jsonRPCRequest = req.body;
  // server.receive returns a promise of a JSON-RPC response.
  // It can also receive an array of requests, in which case it may return an array of responses.
  // Alternatively, you can use server.receiveJSON, which takes a string as input.
  server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      // If response is absent, it was a notification.
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});