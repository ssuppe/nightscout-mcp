# GitHub Public Debut Plan

This document outlines the plan to prepare the Nightscout MCP Server for its initial public release on GitHub. The goal is to present a polished, well-documented, and professional MVP.

## Phase 1: Initial Public Release

This phase focuses on documentation, licensing, and creating a clean repository history.

### 1. Documentation

*   **Create `CONTRIBUTING.md`:** Add a guide for potential contributors, outlining how to report issues, suggest features, and submit pull requests.
*   **Update `README.md`:** Enhance the README with a more detailed project description, a "Getting Started" guide, a link to `CONTRIBUTING.md`, and a "License" section referencing the AGPL-3.0 license.
*   **Review Existing Docs:** Ensure all documents in the `docs/` folder are consistent, up-to-date, and reflect the current state of the project.

### 2. Licensing

*   **Add `LICENSE` file:** Create a `LICENSE` file containing the full text of the AGPL-3.0 license.
*   **Update `package.json`:** Change the `license` field in `package.json` from `ISC` to `AGPL-3.0`.

### 3. Git History Cleanup

To present a clean and professional commit history, we will perform the following steps:

1.  **Squash and Merge `issue3`:** The commits on the `issue3` branch will be squashed and merged into the `develop` branch.
2.  **Merge `develop` into `main`:** The `develop` branch will be merged into `main`, bringing all the latest changes into the primary branch for the release.
3.  **Delete Stale Branches:** The `develop`, `issue3`, and `revision/0.2` branches will be deleted to clean up the repository.

```mermaid
graph TD
    subgraph "Current State"
        A[main]
        B[develop]
        C[issue3]
        D[revision/0.2]
    end

    subgraph "Proposed Changes"
        E[Squash and merge `issue3` into `develop`]
        F[Merge `develop` into `main`]
        G[Delete `develop`, `issue3`, and `revision/0.2`]
    end

    subgraph "Final State"
        H[main (production-ready)]
    end

    A --> F
    C --> E --> F --> H
    B --> F
    D --> G
```

## Phase 2: Future Development (Post-Debut)

The following items are planned for future releases after the initial public debut:

*   **Implement Additional Tools:** Implement the remaining tools defined in `docs/PRD.md`:
    *   `get_treatments`
    *   `get_sgv`
    *   `get_average_glucose`
    *   `get_profile`
*   **Add Unit Tests:** Create a comprehensive test suite with unit tests for all tools and the Nightscout API client to ensure robustness and reliability.
