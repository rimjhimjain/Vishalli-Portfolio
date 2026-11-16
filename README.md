# Vishalli Maini portfolio

Responsive burgundy portfolio and real OpenAI recruiter integration built from the supplied Sri Tech PDF and https://vishalli-maini-portfolio.vercel.app/.

## Run locally

Requires Node 22.13 or later.

```sh
npm ci
cp .env.example .env
npm run dev
```

Open the printed localhost URL. Set `SITE_ORIGIN` to that exact origin. Add `OPENAI_API_KEY` only to the local ignored `.env`, never to browser code or chat. `OPENAI_MODEL` defaults to the guide's example `gpt-4.1-mini`; verify that your OpenAI project has access. Without a key the site works and chat returns an explicit configuration-required response.

```sh
node --test tests/recruiter.test.mjs
npx tsc --noEmit
npm run build
```

## Files

- `app/page.tsx`: portfolio and accessible recruiter dialog.
- `app/globals.css`: burgundy visual design and responsive layouts.
- `app/api/ai-recruiter/chat/route.ts`: POST route.
- `server/recruiter.mjs`: request validation, bounded inputs, rate limiting, provider call and safe errors.
- `server/portfolio.json`: facts verified against the reference portfolio. Server-only import.
- `public/assets/`: source avatar and resume, plus exact mascot extracted from the PDF with its original transparency mask.
- `docs/api-contract.md`: API contract and operational limits.
- `tests/recruiter.test.mjs`: local API behavior checks using the real SDK with simulated provider HTTP responses.

## Deployment

The source is prepared for Sites through its Vinext/Cloudflare starter. `.openai/hosting.json` stores the registered Site ID. The initial Site is private to its owner. Production needs server-side `OPENAI_API_KEY`, configurable `OPENAI_MODEL`, and `SITE_ORIGIN` set to the deployed origin. Use the OpenAI Developers plugin for secure hosted key provisioning, or configure the secret through your deployment settings. Never expose a key through `NEXT_PUBLIC_*`, `VITE_*`, source files or client bundles.

The application limits output to 600 tokens, provider timeout to 20 seconds, conversation history to 10 messages, per-identity requests to 12/minute and total requests to 60/minute per instance. In-memory rate limits are not global across replicas. Before public/high-traffic launch, add shared gateway rate limits, configure OpenAI project spending alerts/limits, and verify a live request and follow-up using an authorized key.

No intro video was present in the supplied reference. The existing avatar is used in the intro, with the original PDF mascot on its right. Employer project diagrams are illustrative. The original Vercel portfolio is unchanged.

The API uses the official OpenAI SDK Responses API: https://developers.openai.com/api/docs/quickstart.
