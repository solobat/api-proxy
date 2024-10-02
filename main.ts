import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

serve(async (req: Request) => {
  const url = new URL(req.url);
  const targetUrl = new URL("https://www.okx.com/api/v5/support/announcements");

  // 保留原始请求的查询参数
  url.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  try {
    const res = await fetch(targetUrl.toString(), {
      headers: req.headers,
      method: req.method,
      body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(res.body, {
      headers,
      status: res.status,
    });
  } catch (error) {
    console.error("代理请求出错:", error);
    return new Response("代理请求失败", { status: 500 });
  }
});
