> **A Note on this Document**
>
> *   **For Human Contributors:** This document outlines the coding conventions for the project. While it was originally written with an AI contributor in mind, the principles and best practices apply to all contributors. Please adhere to these conventions to help maintain a clean and consistent codebase.
> *   **For AI Contributors:** This is your primary guide for writing and refactoring code. Please follow these conventions closely.

---

# TypeScript Coding Conventions for MVP Development

This document outlines the coding conventions and best practices for our LLM agent to follow when writing TypeScript code for this project. As we are in the MVP (Minimum Viable Product) stage, the primary goals are simplicity, clarity, and extensive documentation through comments. The code should be easy for human developers to understand, review, and refactor.

## Core Principles

*   **Simplicity Over Complexity:** For an MVP, a straightforward and easy-to-understand solution is always preferred over a more complex or abstract one. Avoid unnecessary abstractions and stick to solving the core problem.
*   **Clarity and Readability:** The code should be as self-documenting as possible. Clear and descriptive naming is crucial.
*   **Heavy Commenting:** Since this is an MVP and the codebase will evolve, we will be leaving extensive comments to explain the "why" behind the code, document assumptions, and clarify complex sections.

## General Best Practices

### File and Project Structure

*   **File Naming:** Use `camelCase` for file names (e.g., `userService.ts`, `apiClient.ts`).
*   **Organization:** Group related files into directories. For example, all services could go into a `services` directory.
*   **Modules:** Use ES6 modules (`import`/`export`) to organize code. Do not use namespaces.
*   **Imports:** Organize imports with third-party libraries first, followed by local modules. Remove any unused imports.

### Naming Conventions

Enforcing a consistent naming convention reduces cognitive overhead when reading the code.

*   **Variables and Functions:** Use `camelCase` (e.g., `let userCount = 0;`, `function getUser() {}`).
*   **Constants:** Use `CONSTANT_CASE` for global constant values (e.g., `const API_KEY = '...';`).
*   **Classes and Interfaces:** Use `PascalCase` (e.g., `class User {}`, `interface UserProfile {}`).
*   **Enums:** Use `PascalCase` for enum names and `PascalCase` or `CONSTANT_CASE` for their values (e.g., `enum UserRole { Admin, Editor, Viewer }`).
*   **Descriptive Names:** Names should be meaningful and indicate the purpose of the variable, function, or class. If a name requires a lengthy comment to explain, it's a sign the name could be better.

### Language Features

*   **Variable Declaration:** Always use `const` by default. Use `let` only if the variable needs to be reassigned. Never use `var`.
*   **Type Safety:**
    *   **Avoid `any`:** Do not use the `any` type. If the type is unknown, use `unknown` and perform the necessary type checking.
    *   **Type Everything:** Provide explicit types for all variable declarations, function parameters, and function return values. This improves code quality and makes it more self-documenting.
    *   **Strict Mode:** Enable strict type-checking options in your `tsconfig.json`.
    *   **Input Validation:** For input validation, we will use plain JavaScript objects with clear and descriptive property names. This approach is simple and sufficient for our MVP.
        *   **Note on `@modelcontextprotocol/sdk`:** While we aim for simplicity, the `@modelcontextprotocol/sdk` is designed to work with the `zod` library for input schema validation. For any tools created for the MCP server, we will use `zod` to define the input schemas. This ensures compatibility with the SDK and provides robust, type-safe validation.
*   **Functions:**
    *   Keep functions short and focused on a single responsibility.
    *   Use arrow functions for inline functions and to maintain lexical `this` context.
*   **Classes:**
    *   Limit the visibility of properties and methods as much as possible using `private` and `protected` access modifiers.
    *   Prefer `readonly` for properties that should not be changed after initialization.
*   **Interfaces:** Use interfaces to define the shape of objects.

## Commenting Guidelines

Good comments explain the "why," not the "what." The code itself should clearly show *what* it is doing.

*   **File Headers:** Each file should start with a brief comment explaining its purpose.
*   **Function and Method Documentation:**
    *   Use JSDoc-style comments for all exported functions and methods.
    *   Explain the function's purpose, its parameters, and what it returns.
    *   **Example:**
        ```typescript
        /**
         * Fetches a user profile from the API.
         * @param userId The unique identifier of the user.
         * @returns A Promise that resolves to the user's profile information.
         */
        async function getUserProfile(userId: string): Promise<UserProfile> {
          // ... implementation
        }
        ```
*   **In-line Comments:**
    *   Add comments to explain complex or non-obvious logic. If you can't write a clear comment, consider if the code can be refactored to be simpler.
    *   Explain any workarounds or temporary solutions.
    *   Use `// TODO:` for planned future work, including a brief description of what needs to be done.
        ```typescript
        // TODO: Refactor this to use the new validation service once it's available.
        ```
*   **Redundant Comments:** Avoid comments that simply restate what the code is doing.
    *   **Bad:** `// Increment the counter`
    *   `i++;`

## Simplicity for MVP

*   **Focus on the Core:** The primary goal of an MVP is to validate a core idea. The code should reflect this by implementing only the essential features.
*   **Avoid Over-Engineering:** Do not build for every possible future use case. A simple, working implementation is better than a complex, "future-proof" one that is harder to change.
*   **Keep it Lean:** Resist the temptation to add extra features that are not critical to the core user flow.
*   **Iterate:** The MVP is the starting point. We will gather feedback and iterate on the design and functionality.

## Tooling

*   **Linter and Formatter:** We will use ESLint and Prettier to enforce consistent code style and catch potential errors early. The configuration for these tools should align with the conventions in this document.