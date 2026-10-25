# Turning Point

Synthetic football events → calculated pressure shifts → explanations with source evidence.

## Demo

[Watch the original prototype demo](https://youtu.be/GNT_Y6kA3lc). This video shows the template based version before local AI support. It does not demonstrate model inference.

## Run with local AI: no Azure account or API key

Requires Node.js 20+ and [Ollama](https://ollama.com/download). Install those first, then:

```sh
ollama pull phi4-mini
node server.mjs
```

Open **http://127.0.0.1:4173**. On Windows you can also double-click `START-LOCAL-AI.cmd` after installing the prerequisites. Keep Ollama running. The model download is about 2.5 GB; runtime memory and speed depend on your machine.

Select a turning point, choose Plain English or Analyst view, then click **Generate AI explanation**. The local Node server sends calculated statistics and source events to Microsoft's Phi-4-mini through Ollama. No API key is required. Match data stays on your computer.

The server checks the response structure and that cited event IDs belong to the selected moment. This is **not full factual verification**: model wording can still be wrong. Review it against the statistics. Responses are cached per moment and audience. Failed generation leaves the deterministic explanation available and labels the failure.

Environment variables: `PORT` (default `4173`) and `OLLAMA_MODEL` (default `phi4-mini`; pull the selected model yourself). The server binds only to loopback and is intended for local use, not direct internet hosting.

## Preview without AI

Open `dist/index.html` or serve `dist/` using a static HTTP server. The hosted preview displays the setup status but **cannot run your computer's local model**. Model generation requires running `node server.mjs` locally. Replay, statistics, evidence and export work independently of AI.

## Features

* Replay, pause, scrub and speed controls for a fictional 90 minute match.
* Three turning points calculated from 117 synthetic events.
* Pitch event replay, pressure chart, two deterministic explanation styles and clickable evidence.
* Optional local model generated explanations with source references and model provenance.
* JSON export with events, statistics and any generated narratives, including their model/source metadata.

## Method and limitations

Five-minute windows. Pressure = shots × 3 + successful penalty-area entries. Select the three largest increases of at least 10 over the previous window. This is an illustrative heuristic, not xG, a calibrated prediction or proof of causation. Clubs and events are fictional. Player markers are static and schematic; the ball path represents the selected event, not continuous tracking. Full-match insights contain spoilers.

**Integration status:** API and validation tests use simulated model responses. Live Phi-4-mini inference has not yet been verified because Ollama is not installed on the development machine. Installing and running the model is still required. Azure AI / Microsoft Foundry is not connected. Check hackathon eligibility against the full challenge requirements; using a Microsoft model locally does not establish eligibility for an Azure specific category.

## Validation

```sh
node verify.cjs
node test-ai.mjs
```

Checks cover match events, pressure shifts, scores, server side facts, response structure and citations, model failures, caching, invalid input and cross-origin restrictions. They do not prove successful real model inference or narrative quality.
