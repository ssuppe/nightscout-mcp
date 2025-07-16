# **Project: Nightscout MCP Server**

## **1. Project Overview**

This project aims to create a read-only MCP (Model Context Protocol) server for Nightscout, a popular open-source diabetes management platform. The server will enable AI agents to access a user's Nightscout data, allowing for advanced analysis, insights, and visualizations.

The server will be built using the **`mcp-framework`** for TypeScript, which will ensure compliance with the MCP specification and provide a robust foundation for our tools.

## **2. MVP Project Plan**

To deliver value as quickly as possible, we are taking an MVP (Minimum Viable Product) approach. Our initial goal is to get a single, core tool, `get_entries`, working end-to-end.

### **Phase 1: Project Setup with `mcp-framework`**
*   **Initialize Project:** Use the `mcp-framework` CLI to create a new project.
*   **Install Dependencies:** The framework will handle the installation of most dependencies. We will need to add `axios` for our API client.
*   **Create Configuration Files:** Create `.env.example` for our Nightscout URL and token.

### **Phase 2: Implement `get_entries` Tool**
*   **Define Tool Schema:** Create a Zod schema for the `get_entries` tool's inputs.
*   **Implement Tool Logic:** Create a `get_entries` tool class that extends `MCPTool` and implements the `execute` method.
*   **Implement API Client:** Create a minimal API client to fetch data from the Nightscout API.

### **Phase 3: Future Work (Post-MVP)**
*   Implement the remaining tools (`get_treatments`, `get_profile`, `get_sgv`, `get_average_glucose`).
*   Implement a comprehensive testing suite.
*   Enhance documentation.
*   Prepare for deployment.

## **3. Project Documents**

*   [Product Requirements Document (`PRD.md`)](./PRD.md)
*   [Design Document (`DESIGN.md`)](./DESIGN.md)
*   [Coding Conventions (`CONVENTIONS.md`)](./CONVENTIONS.md)