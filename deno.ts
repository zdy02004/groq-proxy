const ALLOWED_HOSTS = ["console.groq.com", "api.groq.com", "api.stytchb2b.groq.com"];

Deno.serve(async (request) => {
  const url = new URL(request.url);
  
  // 从请求路径中提取目标 host（例如 /api.groq.com/v1/chat/completions）
  const pathParts = url.pathname.split('/').filter(Boolean);
  const targetHost = pathParts[0];
  
  if (!ALLOWED_HOSTS.includes(targetHost)) {
    return new Response(JSON.stringify({ error: "Host not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  // 重建目标 URL：去掉路径中的 host 前缀
  url.host = targetHost;
  url.pathname = '/' + pathParts.slice(1).join('/');
  
  const newRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });
  
  return await fetch(newRequest);
});
