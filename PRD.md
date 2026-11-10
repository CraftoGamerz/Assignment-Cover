# Product Requirements Document

## Purpose

JIS Assignment Cover Studio creates polished, print-ready A4 assignment front pages for JIS College of Engineering.

## Core features

- Generate covers from comma-separated student lists, subjects, and assignment numbers.
- Support Section, Group number, institution metadata, adjustable left margin, master font size, themes, and accent colors.
- Keep settings in browser storage and export one or more covers through print-to-PDF.
- Avoid seeding personal identifiers such as college IDs and roll numbers.
- Publish the static application through GitHub Pages.

## Current request

- Publish the current `main` branch to `CraftoGamerz/Assignment-Cover`.
- Serve the static build from the `gh-pages` branch at the GitHub Pages URL.
- Attribute new repository commits to Abusina Hossain, never a generic agent identity.

## Constraints

- Preserve the existing app behavior and user-owned settings.
- Keep the repository URL and generated metadata aligned with the active GitHub Pages account.
- GitHub Pages requires a repository/account plan that permits Pages for the repository visibility selected by the owner.

## Success criteria

- `main` and `gh-pages` are pushed to `CraftoGamerz/Assignment-Cover`.
- GitHub Pages returns the app HTML and stylesheet successfully.
- The latest implementation commit shows Abusina Hossain as author.

## Current deployment

- GitHub Pages: `https://craftogamerz.github.io/Assignment-Cover/`
- Source repository: `https://github.com/CraftoGamerz/Assignment-Cover`

## Out of scope

- Changing repository privacy or GitHub billing/plan settings.
- Adding backend services, authentication, or cloud data storage.
