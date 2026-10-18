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

The public documentation is available at https://gmapscrawl.com/docs. Mintlify hosts the documentation through the website's `/docs` route; edits continue to deploy from `main` in this repository.

The previous `docs.gmapscrawl.com` address permanently redirects to the matching new page, preserving query strings. The main site's robots file advertises the documentation sitemap.
