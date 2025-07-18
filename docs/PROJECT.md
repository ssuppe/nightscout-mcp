> **A Note on this Document**
>
> *   **For Human Contributors:** This document is intended to provide context and insight into the project's history and evolution. As with any project, it's a living document and may not always be perfectly in sync with the latest code. Please use it as a guide and feel free to ask questions.
> *   **For AI Contributors:** This document is a key part of the project's context. Please read it, understand the project's history, and help keep it up-to-date as you make changes to the codebase.

# **Project: Nightscout MCP Server**
Revision: 0.03
## **1. Project Overview**

This project aims to create a read-only MCP (Model Context Protocol) server for Nightscout, a popular open-source diabetes management platform. The server will enable AI agents to access a user's Nightscout data, allowing for advanced analysis, insights, and visualizations.

The server will be built using the **`@modelcontextprotocol/sdk`** for TypeScript, which will ensure compliance with the MCP specification and provide a robust foundation for our tools.

### Learnings from Revision 0.02

During the initial setup, we discovered that the original plan to use `@modelprotocol/ts-sdk` was incorrect. The correct package is `@modelcontextprotocol/sdk`. This led to some initial friction and highlighted the importance of verifying package names and documentation. The plan has been updated to reflect the correct package and a more robust setup process.

## **2. MVP Project Plan**

To deliver value as quickly as possible, we are taking an MVP (Minimum Viable Product) approach. Our initial goal is to get a single, core tool, `get_entries`, working end-to-end. We will build a proof-of-concept MCP server that listens on `localhost:3000` and can be called with `curl` or any other HTTP client.

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
*   Implement the remaining tools (`get_profile`, `get_sgv`, `get_average_glucose`).
*   Implement a comprehensive testing suite.
*   Enhance documentation.
*   Prepare for deployment.

## **3. Learnings from MVP Implementation**

During the initial MVP implementation, we encountered a couple of key issues that are important to document for future development:

*   **The `zod` Dependency:** The `CONVENTIONS.md` file initially suggested using plain JavaScript objects for input validation to keep the MVP simple. However, the `@modelcontextprotocol/sdk` is strongly designed to work with `zod` for defining input schemas. Attempting to bypass `zod` resulted in TypeScript errors and a more complex implementation. We ultimately decided to adopt `zod` as it provides robust, type-safe validation and aligns with the SDK's intended usage. This decision, while seemingly a deviation from the initial "simplicity" principle, will lead to a more maintainable and less error-prone codebase.

*   **Using `zod` Correctly:** When implementing `zod`, we made a mistake in how we passed the schema to the `registerTool` function. The function expects a raw Zod shape (a plain JavaScript object with Zod types as values), not a `z.object()` instance. This was a subtle but important distinction that caused TypeScript errors. The corrected approach is to define the shape as a plain object and then pass that to the `registerTool` function.
## **4. Learnings from GitHub Debut Preparation**

Preparing the repository for its first public release revealed several important points that should be carried forward:

*   **License Alignment:** After initially considering the MIT license for its permissiveness, we chose the AGPL-3.0 license. This decision was made to align with the license of the core Nightscout project, fostering a sense of community and ensuring that this tool and its derivatives remain firmly in the open-source ecosystem.
*   **Dual-Audience Documentation:** A key convention we established is writing documentation for two audiences: human contributors and AI agents. We've added notes to key documents (`PRD.md`, `DESIGN.md`, etc.) to provide context for humans while giving explicit instructions to AI agents to use and maintain the documents. This is a critical part of the project's workflow.
*   **Safe Git History Management:** When performing significant git operations like squashing and merging branches, creating a temporary backup branch (e.g., `backup/pre-release-cleanup`) is a valuable safety measure. It provides a simple, one-step rollback path if needed.
*   **Closing Issues Post-Commit:** We discovered that GitHub issues can be closed after the fact by creating a new, empty commit with a keyword in the message (e.g., `git commit --allow-empty -m "fix: close #3"`). This is a useful technique for maintaining a clean issue tracker.


*   **Tool Definition and Schema:** A key learning was the importance of providing a detailed description of the tool's output in the `description` field of the `registerTool` method. This is crucial for the LLM to understand the shape of the data it will receive. We also created a dedicated `src/lib/schemas.ts` file to define the Zod schema for the Nightscout `Entry` object. This schema is used to validate the data from the Nightscout API and to inform the description of the `get_entries` tool. This approach ensures that our data is valid and that the LLM has a clear understanding of the data it is working with.

*   **Handling Data Inconsistencies:** During testing, we discovered that the Nightscout API does not always return a `dateString` field, which caused our Zod validation to fail. To address this, we made the `dateString` field optional in our `entrySchema` and added logic to our `NightscoutClient` to manually create the `dateString` from the `date` timestamp if it is missing. This makes our server more robust and resilient to inconsistencies in the API data.

*   **Handling Nullable Fields:** The implementation of the `get_treatments` tool revealed that some fields, such as `carbs` and `insulin`, can be `null` in the Nightscout API response. To handle this, we updated our `zod` schema to allow for nullable values and provide a default value of `0`. This ensures that our server can gracefully handle these cases and avoid validation errors.

## **4. Project Documents**

*   [Product Requirements Document (`PRD.md`)](./PRD.md)
*   [Design Document (`DESIGN.md`)](./DESIGN.md)
*   [Coding Conventions (`CONVENTIONS.md`)](./CONVENTIONS.md)
*   [GitHub Debut Plan (`GITHUB_DEBUT.md`)](./GITHUB_DEBUT.md)