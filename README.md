# Turning Point

Interactive hackathon prototype: synthetic football events → calculated pressure shifts → explanations with source evidence.

Open `dist/index.html` in a browser. No installation or API key is required. The static files can also be served with any HTTP server.

## Features

- Play/pause, scrub, speed control and reset for a fictional 90-minute match.
- Three turning points detected from the event data, not hard-coded analytical conclusions.
- Pitch event replay, pressure chart, two explanation styles and clickable evidence.
- Export the complete synthetic event fixture, methods and analysis as JSON.

## Method and limitations

Five-minute windows. Pressure = shots × 3 + successful penalty-area entries. Select the three largest increases of at least 10 over the previous window. This is an illustrative, uncalibrated heuristic, not xG or a claim of causation. Events and teams are fictional. Pitch player markers are schematic and static; the ball path represents the selected event, not continuous tracking. Full-match insights intentionally contain spoilers.

Explanations are currently deterministic templates. **Azure AI / Microsoft Foundry is not connected. This is not yet a complete hackathon submission.** Next: verify the full challenge requirements, connect a server-side Microsoft AI service for grounded explanations, add evaluation cases and prepare the public repository and <2 minute demo. Never put provider API keys in the browser.

## Validation

Run `node verify.cjs` to check fixture analysis, score progression and exported analysis in a minimal DOM harness. Browser visual QA is separate.
