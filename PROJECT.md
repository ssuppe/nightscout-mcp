# **Project: Nightscout MCP Server**

## **1. Project Overview**

This project aims to create a read-only MCP (Model Context Protocol) server for Nightscout, a popular open-source diabetes management platform. The server will enable AI agents to access a user's Nightscout data, allowing for advanced analysis, insights, and visualizations.

The server will be written in TypeScript and will initially support v1 of the Nightscout API. The architecture will be designed to be extensible, allowing for the future implementation of v2 and v3 of the API.

## **2. Revised Project Plan**

The following is the revised, more detailed plan for this project, incorporating testing, improved developer experience, and a clearer path for extensibility.

### **Phase 1: Project Setup & Configuration**
*   **Initialize TypeScript Project:** Set up a new Node.js project with TypeScript.
*   **Install Dependencies:** Install necessary libraries such as `express` for the server, `axios` for the API client, and testing libraries like `jest`.
*   **Create Basic Server Structure:** Set up the initial directory structure for the project (`src`, `dist`, `tests`, etc.).
*   **Create `mcp.json` Configuration File:** Implement the configuration file for non-sensitive settings.
*   **Create `.env.example` File:** Create an example environment file to guide developers on required secrets.
*   **Create `README.md`:** Write initial `README.md` with project description and setup instructions.

### **Phase 2: API Client Implementation (v1)**
*   **Design API Client Interface:** Define a clear interface or abstract class for the API client to ensure future extensibility to v2/v3 of the Nightscout API.
*   **Implement v1 API Client:** Write the client to interact with the Nightscout v1 API endpoints.
*   **Write Unit Tests for API Client:** Develop a suite of unit tests to ensure the API client is working correctly and to catch regressions.

### **Phase 3: MCP Server Tool Implementation**
*   **Implement `get_entries` Tool:** Implement the core tool for retrieving various entry types.
*   **Implement `get_treatments` Tool:** Implement the tool for retrieving treatment data.
*   **Implement `get_profile` Tool:** Implement the tool for retrieving user profile data.
*   **Implement `get_sgv` Tool:** Implement this as a convenience wrapper around the `get_entries` tool, filtering for `sgv` types.
*   **Implement `get_average_glucose` Tool:** Implement the tool for calculating average glucose.
*   **Write Integration Tests for all Tools:** Create integration tests that call the MCP server tools and validate the responses against mock data from the API client.

### **Phase 4: Deployment & Documentation**
*   **Update `README.md`:** Add detailed API documentation for each tool to the `README.md`.
*   **Prepare for Initial Deployment:** Create a Dockerfile or other deployment scripts to facilitate easy deployment.

## **3. Project Documents**

*   [Product Requirements Document (`PRD.md`)](./PRD.md)
*   [Design Document (`DESIGN.md`)](./DESIGN.md)