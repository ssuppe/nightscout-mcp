/**
 * This file defines the `get_entries` tool for the Nightscout MCP server.
 * This tool retrieves entries from the user's Nightscout instance.
 */

import { z } from "zod";
import { NightscoutClient } from "../lib/nightscout.js";

/**
 * The raw shape of the input schema for the `get_entries` tool.
 * This is passed to the `registerTool` function.
 */
export const getEntriesInputShape = {
  count: z.number().optional().default(100),
  find: z.object({}).passthrough().optional(),
};

// We create a Zod object from the shape to infer the type.
const getEntriesInputSchema = z.object(getEntriesInputShape);

/**
 * The type of the input for the `get_entries` tool.
 * This type is inferred from the input schema.
 */
export type GetEntriesInput = z.infer<typeof getEntriesInputSchema>;

import { Entry } from "../lib/schemas.js";

export async function getEntries(
  input: GetEntriesInput,
  client: NightscoutClient
): Promise<Entry[]> {
  return client.getEntries(input.count, input.find);
}