# How to Write a Test

This document outlines the process and best practices for writing unit tests for the Nightscout MCP Server.

## 1. Overview

Our testing philosophy is to use unit tests to verify the logic of individual tools in isolation. This allows us to test the core functionality of our server without relying on a live Nightscout API.

We use **Jest** as our testing framework.

## 2. Prerequisites

Before writing any test code, please follow these steps:
- [ ] **Find or create a GitHub Issue:** If there is an open issue already, pull it and read the instructions and comments. Otherwise, open a new issue in the repository that clearly describes the test(s) you plan to write.
- [ ] **Create a Feature Branch:** Create a new branch from `develop`. Name it using the pattern `feat/issue-<issue_number>-<three-word-description>`.

## 3. Step-by-Step Guide

Follow this checklist to create a new test file for a tool:

- [ ] **Create the Test File:** Create a new file named `<toolName>.test.ts` and place it in the same directory as the tool's source code (e.g., `src/tools/getTreatments.test.ts`).
- [ ] **Import Dependencies:** Import the tool you are testing and any other necessary modules.
- [ ] **Mock the `NightscoutClient`:** Use `jest.mock()` to mock the `NightscoutClient`. This is crucial for isolating the tool from the actual API.
- [ ] **Create a `describe` Block:** Wrap your tests in a `describe` block that names the component being tested (e.g., `describe('getTreatments Tool', () => { ... });`).
- [ ] **Create `it` Blocks:** For each distinct scenario you want to test, create an `it` block that describes the expected behavior (e.g., `it('should return an array of treatments on success', () => { ... });`).
- [ ] **Follow the Arrange, Act, Assert Pattern:**
    -   **Arrange:** Set up your test. This is where you'll define the mock return data for the `NightscoutClient`.
    -   **Act:** Execute the code you are testing. This usually involves creating an instance of your tool and calling its `execute` method.
    -   **Assert:** Verify the outcome. Use Jest's `expect()` function to check that the tool's output is what you expect.

## 4. Mocking Data

Creating realistic mock data is essential for effective tests.

- [ ] **Consult the Human:** Before writing a test, **you must ask the human operator** for sample data or for guidance on creating realistic mock data. The AI agent cannot know the nuances of real-world Nightscout data.
- [ ] **Base Mocks on Schemas:** Ensure your mock data conforms to the Zod schemas defined in `src/lib/schemas.ts`.
- [ ] **Cover Multiple Scenarios:** Create mock data for different scenarios, including:
    -   A successful API call with a typical data payload.
    -   A successful API call that returns an empty array.
    -   A failed API call (to test error handling).
- [ ] **(Optional) Auto-Mocking:** For more complex mocking scenarios, you can use Jest's auto-mocking feature by creating a `__mocks__` directory (e.g., `src/lib/__mocks__/nightscout.ts`).

## 5. Running Tests

-   To run the entire test suite, execute the following command from the root of the project:
    ```bash
    npm test
    ```
-   Jest is configured in `package.json` to automatically discover and run any file ending in `.test.ts` within the `src` directory.