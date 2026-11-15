const HOST_MAP = {
  "basejumper.apple.com": "mesu.apple.com",
  "gdmf-staging-int.apple.com": "gdmf.apple.com"
};

const url = $request.url || "";

const out = url.replace(
  /^(https?:\/\/)(basejumper\.apple\.com|gdmf-staging-int\.apple\.com)(?=[:/?#]|$)/i,
  (_, scheme, host) => scheme + HOST_MAP[host.toLowerCase()]
);

$done(out === url ? {} : { url: out });
