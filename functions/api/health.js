const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

export function onRequestGet() {
  return Response.json({
    ok: true,
    productId: "EV-PROD-001",
    version: "v0.18",
    branch: "preview-v018-guided-backend",
    runtime: "Cloudflare Pages Functions",
    backendPurpose: "Prove deployable API routes for future plan persistence and AI analyst work.",
    analystMode: "deterministic mock",
    externalAi: false,
    secretsRequired: false,
    routes: ["GET /api/health", "POST /api/ai/analyze"],
    status: "ready"
  }, { headers: jsonHeaders });
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...jsonHeaders,
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}
