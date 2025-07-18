import { getTreatments } from './getTreatments';
import { NightscoutClient } from '../lib/nightscout';
import { Treatment } from '../lib/schemas';

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


describe('getTreatments', () => {
  let mockTreatments: Treatment[];
  let clientInstance: jest.Mocked<NightscoutClient>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Get the mocked instance of NightscoutClient
    // This assumes that new NightscoutClient() is called within getTreatments' context
    clientInstance = new NightscoutClient('mock-url', 'mock-token') as jest.Mocked<NightscoutClient>;

    // Realistic mock data for successful treatments based on provided examples
    mockTreatments = [
      {
        _id: '1',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        eventType: 'Meal Bolus',
        insulin: 2.0,
        carbs: 30,
        notes: 'Test meal bolus',
      },
      {
        _id: '2',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        eventType: 'Correction Bolus',
        insulin: 1.5,
        carbs: 0, // Ensure carbs is present and defaults to 0 as per schema
      },
      {
        _id: '3',
        created_at: new Date(Date.now() - 10800000).toISOString(),
        eventType: 'Carb Correction',
        carbs: 15,
        insulin: 0, // Ensure insulin is present and defaults to 0 as per schema
      },
    ];
  });

  it('should return treatments when the API call is successful', async () => {
    // Arrange
    clientInstance.getTreatments.mockResolvedValue(mockTreatments);

    // Act
    const result = await getTreatments({ count: 100, find: {} }, { nightscout: clientInstance });

    // Assert
    expect(clientInstance.getTreatments).toHaveBeenCalledWith(100, {});
    expect(result).toEqual(mockTreatments);
  });

  it('should return an empty array when no treatments are found', async () => {
    // Arrange
    clientInstance.getTreatments.mockResolvedValue([]);

    // Act
    const result = await getTreatments({ count: 100, find: {} }, { nightscout: clientInstance });

    // Assert
    expect(clientInstance.getTreatments).toHaveBeenCalledWith(100, {});
    expect(result).toEqual([]);
  });

  it('should pass the correct count and find parameters to the NightscoutClient', async () => {
    // Arrange
    const testCount = 50;
    const testFind = { eventType: 'Meal Bolus' };
    clientInstance.getTreatments.mockResolvedValue(mockTreatments.filter((t: Treatment) => t.eventType === 'Meal Bolus'));

    // Act
    const result = await getTreatments({ count: testCount, find: testFind }, { nightscout: clientInstance });

    // Assert
    expect(clientInstance.getTreatments).toHaveBeenCalledWith(testCount, testFind);
    expect(result.length).toBeGreaterThan(0); // Ensure some treatments are returned based on filter
    expect(result.every((t: Treatment) => t.eventType === 'Meal Bolus')).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    // Arrange
    const errorMessage = 'Network Error';
    clientInstance.getTreatments.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(getTreatments({ count: 100, find: {} }, { nightscout: clientInstance })).rejects.toThrow(`Failed to retrieve treatments: ${errorMessage}`);
  });
});