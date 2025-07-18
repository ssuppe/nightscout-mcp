import { z } from 'zod';
import { NightscoutClient } from '../lib/nightscout.js';

export const getTreatmentsInputShape = {
  count: z.number().min(1).max(100).default(10),
  find: z.record(z.any()).optional(),
};

const getTreatmentsInputSchema = z.object(getTreatmentsInputShape);

export type GetTreatmentsInput = z.infer<typeof getTreatmentsInputSchema>;

export async function getTreatments(
  input: GetTreatmentsInput,
  context: { nightscout: NightscoutClient }
) {
  return await context.nightscout.getTreatments(input.count, input.find);
}