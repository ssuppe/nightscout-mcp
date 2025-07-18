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

/**
 * The schema for a single Nightscout treatment.
 * This is used to validate the data returned from the /api/v1/treatments.json endpoint.
 */
export const treatmentSchema = z.object({
  _id: z.string().optional(),
  eventType: z.string(),
  created_at: z.string(),
  glucose: z.string().optional(),
  glucoseType: z.string().optional(),
  carbs: z.number().nullable().optional().default(0),
  protein: z.number().optional(),
  fat: z.number().optional(),
  insulin: z.number().nullable().optional().default(0),
  units: z.string().optional(),
  transmitterId: z.string().optional(),
  sensorCode: z.string().optional(),
  notes: z.string().optional(),
  enteredBy: z.string().optional(),
});

/**
 * The schema for an array of Nightscout treatments.
 */
export const treatmentsSchema = z.array(treatmentSchema);

/**
 * The type for a single Nightscout treatment, inferred from the schema.
 */
export type Treatment = z.infer<typeof treatmentSchema>;