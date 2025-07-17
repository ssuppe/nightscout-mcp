# **Project: Nightscout MCP Server**
Revision: 0.03
## **1. Project Overview**

This project aims to create a read-only MCP (Model Context Protocol) server for Nightscout, a popular open-source diabetes management platform. The server will enable AI agents to access a user's Nightscout data, allowing for advanced analysis, insights, and visualizations.

The server will be built using the **`@modelcontextprotocol/sdk`** for TypeScript, which will ensure compliance with the MCP specification and provide a robust foundation for our tools.

### Learnings from Revision 0.02

During the initial setup, we discovered that the original plan to use `@modelprotocol/ts-sdk` was incorrect. The correct package is `@modelcontextprotocol/sdk`. This led to some initial friction and highlighted the importance of verifying package names and documentation. The plan has been updated to reflect the correct package and a more robust setup process.

## **2. MVP Project Plan**

To deliver value as quickly as possible, we are taking an MVP (Minimum Viable Product) approach. Our initial goal is to get a single, core tool, `get_entries`, working end-to-end. From there, we will build a proof of concept MCP server that can be called with both `curl` as well as with an AI client like Claude Desktop or Gemini CLI.

### **Phase 1: Project Setup with `@modelcontextprotocol/sdk`**
*   **Initialize Project:** Use `npm init -y` to create a `package.json` file.
*   **Install Dependencies:** Install the SDK, `axios` for our API client, and `dotenv` for environment variables.
    ```bash
    npm install @modelcontextprotocol/sdk axios dotenv
    ```
*   **Install Dev Dependencies:** Install TypeScript, ts-node, and types.
    ```bash
    npm install -D typescript ts-node @types/node
    ```
*   **Create Configuration Files:** Create `.env.example` for our Nightscout URL and token.

### **Phase 2: Implement `get_entries` Tool**
*   **Define Tool Schema:** Create a plain JavaScript object for the `get_entries` tool's inputs.
*   **Implement Tool Logic:** Create a `get_entries` tool class that extends `MCPTool` and implements the `execute` method.
*   **Implement API Client:** Create a minimal API client to fetch data from the Nightscout API.

### **Phase 3: Future Work (Post-MVP)**
*   Implement the remaining tools (`get_treatments`, `get_profile`, `get_sgv`, `get_average_glucose`).
*   Implement a comprehensive testing suite.
*   Enhance documentation.
*   Prepare for deployment.

## **3. Learnings from MVP Implementation**

During the initial MVP implementation, we encountered a couple of key issues that are important to document for future development:

*   **The `zod` Dependency:** The `CONVENTIONS.md` file initially suggested using plain JavaScript objects for input validation to keep the MVP simple. However, the `@modelcontextprotocol/sdk` is strongly designed to work with `zod` for defining input schemas. Attempting to bypass `zod` resulted in TypeScript errors and a more complex implementation. We ultimately decided to adopt `zod` as it provides robust, type-safe validation and aligns with the SDK's intended usage. This decision, while seemingly a deviation from the initial "simplicity" principle, will lead to a more maintainable and less error-prone codebase.

*   **Using `zod` Correctly:** When implementing `zod`, we made a mistake in how we passed the schema to the `registerTool` function. The function expects a raw Zod shape (a plain JavaScript object with Zod types as values), not a `z.object()` instance. This was a subtle but important distinction that caused TypeScript errors. The corrected approach is to define the shape as a plain object and then pass that to the `registerTool` function.

## **4. Project Documents**

*   [Product Requirements Document (`PRD.md`)](./PRD.md)
*   [Design Document (`DESIGN.md`)](./DESIGN.md)
*   [Coding Conventions (`CONVENTIONS.md`)](./CONVENTIONS.md)