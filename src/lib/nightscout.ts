/**
 * This file contains the Nightscout API client.
 * It is used to fetch data from a Nightscout instance.
 */

import axios from "axios";
import { entriesSchema, Entry } from "./schemas.js";

/**
 * The Nightscout client class.
 * This class is used to interact with the Nightscout API.
 */
export class NightscoutClient {
  private readonly nightscoutUrl: string;
  private readonly apiToken?: string;

  /**
   * Creates a new Nightscout client.
   * @param nightscoutUrl The URL of the Nightscout instance.
   * @param apiToken The API token for the Nightscout instance.
   */
  constructor(nightscoutUrl: string, apiToken?: string) {
    this.nightscoutUrl = nightscoutUrl;
    this.apiToken = apiToken;
  }

  /**
   * Fetches entries from the Nightscout API.
   * @param count The number of entries to fetch.
   * @param find The query to filter the entries.
   * @returns A promise that resolves to an array of entries.
   */
  public async getEntries(
    count: number = 100,
    find?: { [key: string]: any }
  ): Promise<Entry[]> {
    const params: { [key: string]: any } = {
      count,
    };
    if (find) {
      Object.keys(find).forEach((key) => {
        params[`find[${key}]`] = find[key];
      });
    }

    const response = await axios.get(`${this.nightscoutUrl}/api/v1/entries.json`, {
      params,
      headers: {
        "api-secret": this.apiToken,
      },
    });

    // Validate the response data against the schema.
    const validatedEntries = entriesSchema.parse(response.data);
    return validatedEntries;
  }
}