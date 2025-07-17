/**
 * This file contains the Zod schemas for the Nightscout API data.
 * These schemas are used to validate the data returned from the API.
 */

import { z } from "zod";

/**
 * The schema for a single Nightscout entry.
 * This is used to validate the data returned from the /api/v1/entries.json endpoint.
 */
export const entrySchema = z.object({
  type: z.string(),
  dateString: z.string().optional(),
  date: z.number(),
  sgv: z.number().optional(),
  direction: z.string().optional(),
  noise: z.number().optional(),
  filtered: z.number().optional(),
  unfiltered: z.number().optional(),
  rssi: z.number().optional(),
});

/**
 * The schema for an array of Nightscout entries.
 */
export const entriesSchema = z.array(entrySchema);

/**
 * The type for a single Nightscout entry, inferred from the schema.
 */
export type Entry = z.infer<typeof entrySchema>;