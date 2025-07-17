# Nightscout MCP Server

This project is a read-only MCP (Model Context Protocol) server for Nightscout, built with the **`@modelcontextprotocol/sdk`**.

## Getting Started

### Prerequisites

*   Node.js and npm
*   A Nightscout instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ssuppe/nightscout-mcp.git
    cd nightscout-mcp
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
5.  **Create a `.env` file** in the root of the project and add the following environment variables:
    ```
    NIGHTSCOUT_URL=https://your-nightscout-site.com
    NIGHTSCOUT_TOKEN=your-nightscout-api-token
    ```

### Running the Server

You can run the server in two modes:

*   **Development Mode:** This will run the server using `ts-node`, which will automatically transpile and run the TypeScript code. This is the recommended way to run the server during development.
    ```bash
    npm run dev
    ```
*   **Production Mode:** This will first build the project by compiling the TypeScript code to JavaScript, and then run the compiled code.
    ```bash
    npm run build
    npm start
    ```

The server will connect to the stdio transport and will be ready to receive MCP messages.

### Adding Tools

To add a new tool, you will need to:

1.  Create a new file in the `src/tools` directory.
2.  Define the tool's logic in that file.
3.  If the tool takes input, define a `zod` schema for the input.
4.  Register the tool in `src/index.ts` using the `server.registerTool` method.
5.  Provide a detailed description of the tool's functionality and its output schema in the `description` field of the `registerTool` method. This is crucial for the LLM to understand how to use the tool.