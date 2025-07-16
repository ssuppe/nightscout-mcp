# **Product Requirements Document: Nightscout MCP Server**

## **1. Overview**

This document outlines the requirements for a Model Context Protocol (MCP) server for Nightscout. The server will provide a read-only interface to a user's Nightscout instance, allowing AI agents to access diabetes-related data for analysis and insights.

## **2. Customer User Journeys (CUJs)**

The primary users of this MCP server are individuals with diabetes who use Nightscout to monitor their glucose levels and want to leverage AI to gain deeper insights into their data.

*   **CUJ 1: Raw Data Retrieval**
    *   **As a user**, I want to be able to retrieve raw data from my Nightscout instance, such as blood glucose readings, treatments (insulin doses, carbohydrates), and device statuses.
    *   **So that I can** perform my own analysis, create custom visualizations, or share the data with my healthcare provider.

*   **CUJ 2: Derived Insights**
    *   **As a user**, I want to be able to get derived insights from my Nightscout data, such as my average glucose over a specific period, my time in range, or the impact of a meal on my blood sugar.
    *   **So that I can** better understand my diabetes management and make more informed decisions.

## **3. Configuration**

The MCP server will be configured using a combination of environment variables and a configuration file.

### **3.1. Environment Variables (for secrets)**

*   `NIGHTSCOUT_URL`: The full URL of the user's Nightscout instance (e.g., `https://your-nightscout-site.com`).
*   `NIGHTSCOUT_TOKEN`: The access token for the Nightscout API.

### **3.2. Configuration File (for settings)**

A `mcp.json` file will be used to store non-sensitive settings.

```json
{
  "name": "nightscout",
  "description": "An MCP server for interacting with the Nightscout API.",
  "api_version": "v1",
  "units": "mg/dl"
}
```

## **4. MCP Server Tools**

The following tools will be exposed by the MCP server:

### **4.1. `get_treatments`**

This tool retrieves treatment data from the user's Nightscout instance.

*   **Input Schema:**
    *   `count` (optional, number): The number of treatment records to return. Defaults to 100.
    *   `find` (optional, object): A query object to filter the results. Supports nested queries (e.g., `{ "insulin": { "$gte": 3 } }`).
*   **Output:** An array of treatment objects.

### **4.2. `get_sgv`**

This tool retrieves blood glucose readings (Sensor Glucose Values) from the user's Nightscout instance.

*   **Input Schema:**
    *   `count` (optional, number): The number of SGV records to return. Defaults to 100.
    *   `find` (optional, object): A query object to filter the results.
*   **Output:** An array of SGV objects.

### **4.3. `get_average_glucose`**

This tool calculates the average glucose level over a specified time period.

*   **Input Schema:**
    *   `start_time` (required, string): The start of the time period in ISO 8601 format.
    *   `end_time` (required, string): The end of the time period in ISO 8601 format.
    *   `preferred_units` (optional, string): The preferred units for the output (`mg/dl` or `mmol/L`). Overrides the default setting in `mcp.json`.
*   **Output:** An object containing the average glucose value and the units (e.g., `{ "average_glucose": 120, "units": "mg/dl" }`).

### **4.4. `get_entries`**

This tool retrieves entries from the user's Nightscout instance. Entries can be of various types, such as `sgv` (sensor glucose value), `mbg` (meter blood glucose), `cal` (calibration), etc.

*   **Input Schema:**
    *   `count` (optional, number): The number of entries to return. Defaults to 100.
    *   `find` (optional, object): A query object to filter the results. Supports nested queries (e.g., `{ "type": "sgv", "sgv": { "$gte": 180 } }`).
*   **Output:** An array of entry objects.

### **4.5. `get_profile`**

This tool retrieves the user's profile data from Nightscout. The profile contains important settings like insulin sensitivity, carb ratios, and target glucose ranges.

*   **Input Schema:** None
*   **Output:** A profile object.