/**
 * @file This is the main entry point for the Nightscout MCP server.
 * It sets up the Express server and defines the MCP tools.
 */

import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Nightscout MCP Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});