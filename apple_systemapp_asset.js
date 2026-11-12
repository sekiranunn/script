const HOST_MAP = {
  "basejumper.apple.com": "mesu.apple.com",
  "gdmf-staging-int.apple.com": "gdmf.apple.com"
};

const url = $request.url;

if (!url) {
  $done({});
} else {
  let out = url;
  for (const from in HOST_MAP) {
    if (out.indexOf(from) !== -1) {
      out = out.split(from).join(HOST_MAP[from]);
    }
  }
  $done(out === url ? {} : { url: out });
}
