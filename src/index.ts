/**
 * This file contains the main entry point for the Nightscout MCP server.
 * It sets up the server, registers the tools, and starts listening for
 * connections.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import "dotenv/config";
import {
  getEntries,
  getEntriesInputShape,
  GetEntriesInput,
} from "./tools/getEntries.js";
import { NightscoutClient } from "./lib/nightscout.js";
import express from "express";
import { randomUUID } from "node:crypto";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

// The main function is the entry point for the server.
async function main(): Promise<void> {
  // Create a new Nightscout client.
  const nightscoutUrl = process.env.NIGHTSCOUT_URL;
  if (!nightscoutUrl) {
    throw new Error("NIGHTSCOUT_URL is not set.");
  }
  const nightscoutToken = process.env.NIGHTSCOUT_TOKEN;
  const client = new NightscoutClient(nightscoutUrl, nightscoutToken);

  // Create a new MCP server instance.
  const server = new McpServer({
    name: "nightscout",
    version: "1.0.0",
  });

  // Register the get_entries tool.
  server.registerTool(
    "get_entries",
    {
      title: "Get Entries",
      description: `Retrieves entries from the user's Nightscout instance. The output is a JSON string representing an array of entry objects, each with the following properties:
- type: (string) The type of entry (e.g., sgv, mbg, cal).
- dateString: (string) The date of the entry in ISO 8601 format.
- date: (number) The date of the entry as an epoch number.
- sgv: (number, optional) The glucose reading.
- direction: (string, optional) The direction of glucose trend.
- noise: (number, optional) The noise level at the time of the reading.
- filtered: (number, optional) The raw filtered value from the CGM transmitter.
- unfiltered: (number, optional) The raw unfiltered value from the CGM transmitter.
- rssi: (number, optional) The signal strength from the CGM transmitter.`,
      inputSchema: getEntriesInputShape,
    },
    async (input: GetEntriesInput) => {
      const entries = await getEntries(input, client);
      return {
        content: [{ type: "text", text: JSON.stringify(entries, null, 2) }],
      };
    }
  );

  const app = express();
  app.use(express.json());

  const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

  app.post("/mcp", async (req, res) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId) => {
          transports[sessionId] = transport;
        },
      });

      transport.onclose = () => {
        if (transport.sessionId) {
          delete transports[transport.sessionId];
        }
      };
      await server.connect(transport);
    } else {
      res.status(400).json({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Bad Request: No valid session ID provided",
        },
        id: null,
      });
      return;
    }

    await transport.handleRequest(req, res, req.body);
  });

  const handleSessionRequest = async (
    req: express.Request,
    res: express.Response
  ) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
      res.status(400).send("Invalid or missing session ID");
      return;
    }

    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
  };

  app.get("/mcp", handleSessionRequest);
  app.delete("/mcp", handleSessionRequest);

  const port = 8080;
  app.listen(port, "localhost", () => {
    console.log(`Nightscout MCP server started successfully.`);
    console.log(`Listening on http://localhost:${port}/mcp`);
  });
}

// Start the server.
main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});