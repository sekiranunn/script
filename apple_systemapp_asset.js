/*
 * Apple 内部构建资产域名 -> 公网等价域名
 *
 * MobileGestalt 的 InternalBuild 被改成 true 后，部分系统守护进程会把请求发往
 * Apple 内部域名。这些域名在公网没有地址记录（或整体 NXDOMAIN），于是：
 *   - appstored 拉系统 App 清单失败 -> 邮件 / 新闻等被删掉的系统 App 装不回来
 *   - softwareupdated 拉 OTA 元数据失败
 *
 * 已核实的对应关系（用 DoH 和实际取数验证过）：
 *   basejumper.apple.com        -> mesu.apple.com
 *       同一 /systemassets/<BuildID>/<SystemImageID>/... 路径在 mesu 上
 *       返回 200 和真实清单 XML
 *   gdmf-staging-int.apple.com  -> gdmf.apple.com
 *       gdmf.apple.com/v2/pmv 返回真实元数据 plist（含 ProductVersion/Build）
 *
 * 注意：gateway.push.apple.com 是 APNs 旧版二进制网关，流量里没有 URL，
 * 本脚本无法改写。那条只能在 MobileGestalt 里把 InternalBuild 改回 false。
 */

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
