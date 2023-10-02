import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

serve(async (req: Request) => {
  const url = new URL(req.url);
  const targetUrl = url.href.replace(`${url.origin}/`, "");
  let urlObj: any;
  try {
    urlObj = new URL(targetUrl);
  } catch (e) {
    console.error(e.message);
  }
  if (["http:", "https:"].indexOf(urlObj?.protocol) > -1) {
    let res = await fetch(targetUrl, {
      headers: req.headers,
      method: req.method,
      body: req.body,
    });
    let headers = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });
    if (
      "*" !== headers["Access-Control-Allow-Origin"]?.trim() &&
      "*" !== headers["access-control-allow-origin"]?.trim()
    ) {
      headers["Access-Control-Allow-Origin"] = "*";
    }
    return new Response(res.body, { headers, status: res.status });
  }
  return new Response(
    `Usage: ${url.origin}/https://deno.com/deploy/docs/pricing-and-limits`
  );
});
