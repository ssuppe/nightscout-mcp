# Nightscout MCP Server

This project is a read-only MCP (Model Context Protocol) server for Nightscout, built with the **`mcp-framework`**.

## Getting Started

### Prerequisites

*   Node.js and npm
*   A Nightscout instance

### Installation

1.  **Install the `mcp-framework` CLI:**
    ```bash
    npm install -g mcp-framework
    ```
2.  **Create a new project:**
    ```bash
    mcp create nightscout-mcp-server
    cd nightscout-mcp-server
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Install `axios`:**
    ```bash
    npm install axios
    ```
5.  **Create a `.env` file** in the root of the project and add the following environment variables:
    ```
    NIGHTSCOUT_URL=https://your-nightscout-site.com
    NIGHTSCOUT_TOKEN=your-nightscout-api-token
    ```

### Running the Server

1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  **Start the server:**
    ```bash
    npm start
    ```

The server will be running on `http://localhost:8080` by default.

### Adding Tools

You can add new tools to the server using the `mcp-framework` CLI:

```bash
mcp add tool <tool-name>