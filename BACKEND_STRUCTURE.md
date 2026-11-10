# Backend Structure

## Architecture

This is a static, client-side application. No server-side API, database, authentication model, or network business logic exists.

## Client settings model

- `names`, `collegeIds`, `rolls`, `sections`, `groups`: comma-separated user input.
- `stream`, `year`, `academicYear`, `collegeName`, `assignmentLabel`, `submissionNote`, `submittedByLabel`: shared cover metadata.
- `leftMargin`, `fontScale`, `theme`, `accent`, `sortMode`: presentation settings.
- `subjects`, `assignments`: page-generation inputs.

## Validation and logic

- Lists are trimmed and split by commas/newlines.
- A lone metadata value applies to all names; ordered values apply by index.
- User data is local to the browser; no request payloads or external storage are used.
