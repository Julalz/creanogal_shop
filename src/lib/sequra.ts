import { getSiteUrl } from "@/lib/site-url";

export type SequraMerchantCredential = {
  ref: string;
  assets_key?: string;
  country?: string;
  currency?: string;
};

let cachedMerchantCredentials: SequraMerchantCredential[] | null = null;
let cachedMerchantId: string | null = null;

export function getSequraConfigStatus() {
  const accountKey = process.env.SEQURA_ACCOUNT_KEY?.trim();
  const accountSecret = process.env.SEQURA_ACCOUNT_SECRET?.trim();

  const missing: string[] = [];
  if (!accountKey) missing.push("SEQURA_ACCOUNT_KEY");
  if (!accountSecret) missing.push("SEQURA_ACCOUNT_SECRET");

  return {
    configured: missing.length === 0,
    missing,
  };
}

export function isSequraConfigured() {
  return getSequraConfigStatus().configured;
}

export function getSequraApiBase() {
  const env = (process.env.SEQURA_ENV ?? "sandbox").toLowerCase();
  if (env === "live" || env === "production") {
    return "https://live.sequrapi.com";
  }
  return "https://sandbox.sequrapi.com";
}

function getSequraAuthHeader() {
  const key = process.env.SEQURA_ACCOUNT_KEY!.trim();
  const secret = process.env.SEQURA_ACCOUNT_SECRET!.trim();
  const token = Buffer.from(`${key}:${secret}`).toString("base64");
  return `Basic ${token}`;
}

export function parseSequraError(body: string, status: number) {
  try {
    const data = JSON.parse(body) as { errors?: string[] };
    const message = data.errors?.join(" ") ?? body;
    if (/access denied/i.test(message)) {
      return "Acceso denegado por SeQura. Revisa SEQURA_ACCOUNT_KEY y SEQURA_ACCOUNT_SECRET (usuario y contraseña del portal).";
    }
    return message;
  } catch {
    if (status === 401 || status === 403) {
      return "Acceso denegado por SeQura. Revisa usuario, contraseña e ID de Merchant en el portal.";
    }
    return body || `SeQura respondió con ${status}.`;
  }
}

export function buildSequraPublicUrl(path: string) {
  const siteUrl = getSiteUrl();
  const env = (process.env.SEQURA_ENV ?? "sandbox").toLowerCase();
  const isLocal = /localhost|127\.0\.0\.1/.test(siteUrl);
  const fullUrl = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  if (env === "sandbox" && isLocal) {
    return `unverified-https://${fullUrl.replace(/^https?:\/\//, "")}`;
  }

  return fullUrl;
}

export function extractSequraOrderUuid(orderUrl: string) {
  const match = orderUrl.match(/\/orders\/([0-9a-f-]{36})/i);
  return match?.[1] ?? null;
}

async function sequraRawRequest(
  target: string,
  init: RequestInit & { accept?: string } = {},
  options: { merchantId?: string; skipMerchantHeader?: boolean } = {},
) {
  const url = target.startsWith("http") ? target : `${getSequraApiBase()}${target}`;
  const headers = new Headers(init.headers);
  headers.set("Authorization", getSequraAuthHeader());
  headers.set("Accept", init.accept ?? "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (!options.skipMerchantHeader && options.merchantId) {
    headers.set("Sequra-Merchant-Id", options.merchantId);
  }

  return fetch(url, { ...init, headers });
}

export async function fetchSequraMerchantCredentials() {
  if (cachedMerchantCredentials) return cachedMerchantCredentials;

  const response = await sequraRawRequest(
    "/merchants/credentials",
    { method: "GET", accept: "application/json" },
    { skipMerchantHeader: true },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error(`[sequra] GET /merchants/credentials → ${response.status}`);
    throw new Error(parseSequraError(text, response.status));
  }

  const data = (await response.json()) as SequraMerchantCredential[];
  cachedMerchantCredentials = data;
  console.info(`[sequra] Credenciales OK. Merchant ref: ${data[0]?.ref ?? "?"}`);
  return data;
}

/** ID de Merchant real (campo "ref" de la API), no confundir con el nombre de usuario. */
export async function resolveSequraMerchantId() {
  if (cachedMerchantId) return cachedMerchantId;

  const fromEnv = process.env.SEQURA_MERCHANT_ID?.trim();
  const credentials = await fetchSequraMerchantCredentials();
  const ref = credentials[0]?.ref?.trim();

  if (!ref) {
    throw new Error("SeQura no devolvió el ID de Merchant. Contacta con soporte SeQura.");
  }

  if (fromEnv && fromEnv !== ref) {
    console.warn(
      `[sequra] SEQURA_MERCHANT_ID="${fromEnv}" no coincide con el ID real "${ref}". Usando "${ref}".`,
    );
  }

  cachedMerchantId = ref;
  return ref;
}

export async function sequraRequest(
  target: string,
  init: RequestInit & { accept?: string } = {},
) {
  const merchantId = await resolveSequraMerchantId();
  return sequraRawRequest(target, init, { merchantId });
}

export function clearSequraCredentialCache() {
  cachedMerchantCredentials = null;
  cachedMerchantId = null;
}
