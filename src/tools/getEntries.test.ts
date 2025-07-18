import { getEntries } from './getEntries';
import { NightscoutClient } from '../lib/nightscout';
import { Entry } from '../lib/schemas';

// Mock the entire ../lib/nightscout.js module
jest.mock('../lib/nightscout', () => {
  // Manually create a mock for the NightscoutClient class
  const mockNightscoutClient = jest.fn().mockImplementation(() => {
    return {
      nightscoutUrl: 'mock-url', // Required by NightscoutClient constructor
      apiToken: 'mock-token',   // Required by NightscoutClient constructor
      getTreatments: jest.fn(),
      getEntries: jest.fn(),
    };
  });
  return {
    NightscoutClient: mockNightscoutClient,
  };
});

describe('getEntries', () => {
  let mockEntries: Entry[];
  let clientInstance: jest.Mocked<NightscoutClient>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Get the mocked instance of NightscoutClient
    clientInstance = new NightscoutClient('mock-url', 'mock-token') as jest.Mocked<NightscoutClient>;

    // Realistic mock data for successful entries based on provided examples
    mockEntries = [
      {
        type: 'sgv',
        date: Date.now() - 3600000, // 1 hour ago
        dateString: new Date(Date.now() - 3600000).toISOString(),
        sgv: 120,
        direction: 'Flat',
        noise: 1,
        filtered: 120000,
        unfiltered: 120000,
        rssi: 100,
      },
      {
        type: 'mbg',
        date: Date.now() - 7200000, // 2 hours ago
        dateString: new Date(Date.now() - 7200000).toISOString(),
        // mbg is not part of the Entry schema, so we omit it
      },
      {
        type: 'cal',
        date: Date.now() - 10800000, // 3 hours ago
        dateString: new Date(Date.now() - 10800000).toISOString(),
      },
    ];
  });

  it('should return entries when the API call is successful', async () => {
    // Arrange
    clientInstance.getEntries.mockResolvedValue(mockEntries);

    // Act
    const result = await getEntries({ count: 100, find: {} }, clientInstance);

    // Assert
    expect(clientInstance.getEntries).toHaveBeenCalledWith(100, {});
    expect(result).toEqual(mockEntries);
  });

  it('should return an empty array when no entries are found', async () => {
    // Arrange
    clientInstance.getEntries.mockResolvedValue([]);

    // Act
    const result = await getEntries({ count: 100, find: {} }, clientInstance);

    // Assert
    expect(clientInstance.getEntries).toHaveBeenCalledWith(100, {});
    expect(result).toEqual([]);
  });

  it('should pass the correct count and find parameters to the NightscoutClient', async () => {
    // Arrange
    const testCount = 50;
    const testFind = { type: 'sgv' };
    clientInstance.getEntries.mockResolvedValue(mockEntries.filter((e: Entry) => e.type === 'sgv'));

    // Act
    const result = await getEntries({ count: testCount, find: testFind }, clientInstance);

    // Assert
    expect(clientInstance.getEntries).toHaveBeenCalledWith(testCount, testFind);
    expect(result.length).toBeGreaterThan(0); // Ensure some entries are returned based on filter
    expect(result.every((e: Entry) => e.type === 'sgv')).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    // Arrange
    const errorMessage = 'API Error: Could not fetch entries';
    clientInstance.getEntries.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(getEntries({ count: 100, find: {} }, clientInstance)).rejects.toThrow(`Failed to retrieve entries: ${errorMessage}`);
  });
});