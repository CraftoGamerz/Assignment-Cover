# Application Flow

## Screens

1. **Generator workspace** — left editor for student, subject, design, and output settings; right A4 live previews.
2. **Print dialog** — browser-native print/save-as-PDF output for all generated pages.

## Main paths

1. Visitor opens the GitHub Pages URL.
2. Defaults and saved browser settings load.
3. Visitor edits fields; changes autosave locally.
4. Covers regenerate for every student × subject × assignment combination.
5. Visitor selects Export PDF / Print to save A4 pages.

## States and edge cases

- Empty subject: show the empty-preview prompt.
- One metadata value with many names: reuse the single value for each name.
- Multiple metadata values: match values by comma-list order.
- Missing personal metadata: render an em dash on the cover; do not seed private data.
- Legacy saved JIS ID and roll examples: remove them on load.
- GitHub Pages unavailable for the selected repository visibility: the repository owner must enable Pages eligibility or use the existing independent host.
