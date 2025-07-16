/**
 * @file This file contains the NightscoutClient class, which is responsible
 * for all communication with the Nightscout API.
 */

import axios from 'axios';
import { Entry } from '../models/entry';

/**
 * A client for interacting with the Nightscout API.
 */
export class NightscoutClient {
  private readonly nightscoutUrl: string;
  private readonly apiToken: string;

  /**
   * Creates a new instance of the NightscoutClient.
   * @param nightscoutUrl The base URL of the Nightscout instance.
   * @param apiToken The API token for authenticating with the Nightscout API.
   */
  constructor(nightscoutUrl: string, apiToken: string) {
    this.nightscoutUrl = nightscoutUrl;
    this.apiToken = apiToken;
  }

  /**
   * Fetches entries from the Nightscout API.
   * @param count The number of entries to return.
   * @param find A query object to filter the results.
   * @returns A Promise that resolves to an array of entries.
   */
  public async getEntries(count: number = 100, find?: object): Promise<Entry[]> {
    const url = `${this.nightscoutUrl}/api/v1/entries.json`;
    const response = await axios.get<Entry[]>(url, {
      headers: {
        'api-secret': this.apiToken,
      },
      params: {
        count,
        find,
      },
    });
    return response.data;
  }
}