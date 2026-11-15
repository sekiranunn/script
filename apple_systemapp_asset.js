const HOST_MAP = {
  "basejumper.apple.com": "mesu.apple.com",
  "gdmf-staging-int.apple.com": "gdmf.apple.com"
};

const url = $request.url || "";
const pattern = /^(https?:\/\/)(basejumper\.apple\.com|gdmf-staging-int\.apple\.com)(?=[:/?#]|$)/i;
const match = url.match(pattern);

if (!match) {
  $done({});
} else {
  const newHost = HOST_MAP[match[2].toLowerCase()];
  const out = url.replace(pattern, (_, scheme) => scheme + newHost);
  const headers = Object.assign({}, $request.headers || {});
  const port = url.slice(match[0].length).match(/^:\d+/);
  const authority = newHost + (port ? port[0] : "");
  let hasHost = false;
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === "host" || key.toLowerCase() === ":authority") {
      headers[key] = authority;
      hasHost = true;
    }
  }
  if (!hasHost) headers.Host = authority;
  $done({ url: out, headers });
}
