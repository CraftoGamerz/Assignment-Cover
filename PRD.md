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

- Remove unused alternate-hosting and build-tool configuration.
- Keep the project as a plain Next.js static export published to `CraftoGamerz/Assignment-Cover`.
- Re-author the published Git history so `CraftoGamerz` is the sole displayed author and committer.

## Constraints

- Preserve the existing app behavior and user-owned settings.
- Keep the repository URL and generated metadata aligned with the active GitHub Pages account.
- GitHub Pages requires a repository/account plan that permits Pages for the repository visibility selected by the owner.
- Rewriting history changes commit IDs and requires force-pushing `main` and `gh-pages`.

## Success criteria

- `main` and `gh-pages` are pushed to `CraftoGamerz/Assignment-Cover`.
- GitHub Pages returns the app HTML and stylesheet successfully.
- No tracked source/configuration references the removed alternate hosting platform or unused build tooling.
- Published `main` and `gh-pages` history shows CraftoGamerz as author and committer.

## Current deployment

- GitHub Pages: `https://craftogamerz.github.io/Assignment-Cover/`
- Source repository: `https://github.com/CraftoGamerz/Assignment-Cover`

## Out of scope

- Changing repository privacy or GitHub billing/plan settings.
- Adding backend services, authentication, or cloud data storage.
