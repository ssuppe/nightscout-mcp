/**
 * @file This is the main entry point for the Nightscout MCP server.
 * It sets up the Express server and defines the MCP tools.
 */

import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
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

/**
 * @route POST /mcp/get_entries
 * @description This tool retrieves entries from the user's Nightscout instance.
 * @param {number} [count=100] - The number of entries to return.
 * @param {object} [find] - A query object to filter the results.
 * @returns {Promise<Entry[]>} An array of entry objects.
 */
app.post('/mcp/get_entries', async (req: Request, res: Response) => {
  try {
    const { count, find } = req.body;
    const entries = await nightscoutClient.getEntries(count, find);
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch entries from Nightscout.' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Nightscout MCP Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});