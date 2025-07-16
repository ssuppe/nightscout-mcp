# **Project: Nightscout MCP Server**

## **1. Project Overview**

This project aims to create a read-only MCP (Model Context Protocol) server for Nightscout, a popular open-source diabetes management platform. The server will enable AI agents to access a user's Nightscout data, allowing for advanced analysis, insights, and visualizations.

The server will be written in TypeScript and will initially support v1 of the Nightscout API. The architecture will be designed to be extensible, allowing for the future implementation of v2 and v3 of the API.

## **2. MVP Project Plan**

To deliver value as quickly as possible, we are taking an MVP (Minimum Viable Product) approach. Our initial goal is to get a single, core tool, `get_entries`, working end-to-end.

### **Phase 1: Minimal Project Setup**
*   **Install Dependencies:** Install essential libraries (`typescript`, `express`, `axios`).
*   **Create `tsconfig.json`:** Configure the TypeScript compiler.
*   **Create Basic Server Structure:** Set up the initial `src/index.ts` file.
*   **Create Configuration Files:** Create `mcp.json` and `.env.example`.

### **Phase 2: Implement `get_entries` End-to-End**
*   **Implement Minimal API Client:** Write the client code necessary to fetch data for the `get_entries` tool.
*   **Implement `get_entries` MCP Tool:** Build the `get_entries` tool itself.
*   **Create Simple Manual Test:** Create a simple way to manually test the tool (e.g., a `curl` command).

### **Phase 3: Future Work (Post-MVP)**
*   Implement the remaining tools (`get_treatments`, `get_profile`, `get_sgv`, `get_average_glucose`).
*   Implement a comprehensive testing suite.
*   Enhance documentation.
*   Prepare for deployment.

## **3. Project Documents**

*   [Product Requirements Document (`PRD.md`)](./PRD.md)
*   [Design Document (`DESIGN.md`)](./DESIGN.md)
*   [Coding Conventions (`CONVENTIONS.md`)](./CONVENTIONS.md)