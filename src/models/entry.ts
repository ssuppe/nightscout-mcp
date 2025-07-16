/**
 * @file Defines the data models for the Entry and SGV types from the Nightscout API.
 */

export interface Entry {
  _id: string;
  app: string;
  date: number;
  device: string;
  isReadOnly: boolean;
  isValid: boolean;
  type: string;
  utcOffset: number;
  created_at: string;
  identifier: string;
  srvModified: number;
  srvCreated: number;
  subject: string;
  mills: number;
}

export interface SGV extends Entry {
  direction: string;
  filtered: number;
  sgv: number;
  unfiltered: number;
  units: 'mg/dl' | 'mmol/L';
}