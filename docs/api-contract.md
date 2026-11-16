# Recruiter API contract

POST /api/ai-recruiter/chat, Content-Type: application/json, same-origin only.

Request: {"message":"What has Vishalli built?","history":[]}

message: trimmed string, 1–2,000 characters. history: at most 10 user/assistant messages, each 1–6,000 characters. Other fields and system roles are rejected. Total body limit: 48,000 bytes. Successful response: {"answer":"..."}. Errors: {"error":"safe human-readable message"}; configuration errors also have code "configuration_required".

Status codes: 400 invalid JSON/input, 403 origin denied, 405 wrong method, 413 body too large, 415 wrong content type, 429 rate limit, 502 provider failure/empty answer, 503 missing credentials/provider quota, 504 timeout. Responses are never cached. OpenAI requests time out after 20 seconds, have no automatic retries, disable response storage, and cap output at 600 tokens.

The server limits each trusted platform identity to 12 requests/minute and all requests to 60/minute per server instance. In-memory counters reset on restart and are not global across replicas. Before public/high-traffic deployment, add a shared gateway or persistent rate limiter and configure provider spending limits. The initial hosted Site remains owner-private.
