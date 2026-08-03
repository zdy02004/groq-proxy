const OPENAI_API_HOST = "api.stytchb2b.groq.com";

Deno.serve(async (request) => {
  const url = new URL(request.url);
  url.host = OPENAI_API_HOST;

  const newRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });
  return await fetch(newRequest);
}); 改为可同时转发 console.groq.com  api.groq.com  api.stytchb2b.groq.com
