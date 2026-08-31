export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.FRONTEND_URL;
  if (!url) return "http://localhost:3000";
  return url.replace(/\/$/, "");
}
