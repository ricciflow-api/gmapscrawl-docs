# G Maps Crawl documentation

Public Mintlify documentation for https://gmapscrawl.com/docs.

## Local development

```bash
npm test
npx mint dev
```

`docs.json` controls navigation. `openapi.json` is a checked-in snapshot of https://gmapscrawl.com/api/v1/openapi.json, generated from the Search API contract on September 30, 2026. Review contract changes before replacing it. Deploy `main` from this repository using Mintlify.

Related: [MCP](https://github.com/ricciflow-api/gmapscrawl-mcp) · [Agent skills](https://github.com/ricciflow-api/gmapscrawl-agent-skills).

## Hosting

The Mintlify deployment `gmapscrawl` uses the public address `gmapscrawl.com/docs` and the `/docs` base path. The website proxies `/docs`, `/_mintlify`, `/mintlify-assets`, and `/api/request` to `gmapscrawl.mintlify.site`; keep these rules when deploying the website. Documentation pages, Markdown exports, the OpenAPI file, and LLM indexes remain under `/docs`.

The previous `docs.gmapscrawl.com` hostname permanently redirects to the matching `/docs` path through Cloudflare, preserving query strings. The main site's robots file advertises both the website and documentation sitemaps.
