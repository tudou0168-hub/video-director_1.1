# MCP And Browser Tools Notes

This project does not require extra MCP installation for normal work.

## Preferred Local Preview Path

Use the built-in HyperFrames loop first:

```bash
npm run check:creator-overlay
npm run validate
npm run validate:components
npm run snapshot:creator60
npx hyperframes inspect
```

Use `snapshots/contact-sheet.jpg` for keyframe review.

## Codex Browser

Use the Codex Browser plugin when a local page needs visual inspection or interaction.

Recommended use:

- Inspect local HyperFrames preview pages.
- Check layout, overlap, and readability.
- Avoid using it as a replacement for snapshot/inspect.

## Playwright / BrowserTools / Chrome DevTools MCP

These are optional debugging tools only.

Use them when:

- A browser-only rendering issue cannot be reproduced by `snapshot`.
- You need DOM inspection, console logs, or interaction checks.
- You are debugging a local preview page.

Do not:

- Add MCP config files unless explicitly requested.
- Require another user to install these tools to run the template.
- Store cookies, tokens, browser profiles, or credentials in this repo.

## Security

- Never commit MCP credentials.
- Never commit browser profiles.
- Never paste private cookies into docs.
- Prefer localhost targets for testing.
