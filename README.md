# Nightscout MCP Server

This project is a read-only MCP (Model Context Protocol) server for Nightscout.

## Getting Started

### Prerequisites

*   Node.js and npm
*   A Nightscout instance

### Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the project and add the following environment variables:
    ```
    NIGHTSCOUT_URL=https://your-nightscout-site.com
    NIGHTSCOUT_TOKEN=your-nightscout-api-token
    ```

### Running the Server

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Start the server:
    ```bash
    npm start
    ```

The server will be running on `http://localhost:3000`.

### Testing the `get_entries` Tool

You can test the `get_entries` tool using `curl`:

```bash
curl -X POST http://localhost:3000/mcp/get_entries \
-H "Content-Type: application/json" \
-d '{
  "count": 5,
  "find": {
    "type": "sgv"
  }
}'