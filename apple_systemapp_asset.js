/*
 * basejumper.apple.com -> mesu.apple.com
 *
 * 背景：MobileGestalt 的 InternalBuild 被改成 true 后，appstored 拿系统 App
 * 资产清单（com.apple.MobileAsset.SystemApp）时会把 host 换成
 * basejumper.apple.com。该域名公网没有 A/AAAA 记录，且 Apple 边缘节点不接受
 * 这个 SNI，所以系统 App（邮件、新闻等）无法重新下载。
 *
 * 实测：同一个 /systemassets/<BuildID>/<SystemImageID>/... 路径在
 * mesu.apple.com 上返回 200 和真实清单，所以只要把 host 换回来即可。
 *
 * 提醒：这条链路走 MITM，mobileassetd 未必信任用户根证书。
 */

const FROM_HOST = "basejumper.apple.com";
const TO_HOST = "mesu.apple.com";

const url = $request.url;

if (url && url.indexOf(FROM_HOST) !== -1) {
  $done({ url: url.split(FROM_HOST).join(TO_HOST) });
} else {
  $done({});
}
