# Plan for Issue #4: Implement the get_treatments tool

This document outlines the step-by-step plan to implement the `get_treatments` tool, as requested in Issue #4.

## 1. Define Input Schema

- **File:** `src/tools/getTreatments.ts`
- **Action:** Create a `zod` schema to validate the input for the `get_treatments` tool.
- **Details:** The schema will be based on the requirements specified in `docs/PRD.md`.

## 2. Define Data Schema

- **File:** `src/lib/schemas.ts`
- **Action:** Create a `zod` schema for the treatment data returned by the Nightscout API.
- **Details:** This schema will be derived from the `docs/NIGHTSCOUT_V1_SCHEMA.json` file.

## 3. Update Nightscout Client

- **File:** `src/lib/nightscout.ts`
- **Action:** Add a new method to the `NightscoutClient` class to fetch treatment data.
- **Details:** This method will handle the API request to the `/api/v1/treatments` endpoint and use the schema from the previous step to validate the response.

## 4. Implement the Tool

- **File:** `src/tools/getTreatments.ts`
- **Action:** Create the `get_treatments` tool.
- **Details:** The tool will use the `NightscoutClient` to fetch the data and will be structured similarly to the existing `getEntries.ts` tool.

## 5. Register the Tool

- **File:** `src/index.ts`
- **Action:** Import and register the `get_treatments` tool with the MCP server.

## 6. Verification

- **Action:** Run the server and test the new tool.
- **Details:** This will involve creating a test case to ensure the tool functions as expected.

## 7. Manual Validation

- **Action:** Manually test the `get_treatments` tool using the Gemini CLI.
- **Details:** This step was added to ensure the tool works as expected before committing the code and creating a pull request. This manual validation step helped identify and fix a bug in the `treatmentSchema` where the `carbs` and `insulin` fields were not correctly handled as nullable.