# Nightscout MCP Server

This project is a read-only MCP (Model Context Protocol) server for Nightscout, built with the **`@modelcontextprotocol/sdk`**. It allows AI agents and other tools to interact with your Nightscout data in a structured and secure way, enabling advanced analysis, insights, and visualizations.

## Features

*   **Get Entries:** Retrieve raw data from your Nightscout instance, such as blood glucose readings, and device statuses.
*   **Get Treatments:** Retrieve treatment data from your Nightscout instance, such as insulin doses and carb intake.
*   **Extensible:** Easily add new tools to expose more of the Nightscout API.
*   **Secure:** Your Nightscout URL and token are kept secure on the server and are not exposed to the AI model.

### API Support

*   **Nightscout API v1:** Currently, this server only supports v1 of the Nightscout API.

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
3.  **Create a `.env` file** in the root of the project and add the following environment variables:
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

The server will start and listen on `http://localhost:3000/mcp`. You will see a confirmation message in the console.

## Query Quickstart
Try commands like:
   * What is my most recent blood glucose reading?
   * What is my average blood sugar since 8am?
   * What treatments have I taken this morning?

Your mileage may vary. I intend to add more specific tooling for more predictable results.

## TODO

- [ ] Add additional read-only capabilities directly from the API (starting with Profiles)
- [ ] Create helper tools (such as averages, percentiles, finding high and low times of day, etc)

## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get involved.

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.
