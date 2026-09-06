import { mkdir, readFile, readdir, unlink, writeFile } from "fs/promises";
import path from "path";
import type { OrderPayload } from "@/types/order";

export type SequraOrderStatus = "pending" | "confirmed" | "on_hold" | "cancelled";

export type SequraStoredOrder = {
  merchantOrderRef: string;
  sequraOrderUrl: string;
  sequraOrderUuid: string;
  order: OrderPayload;
  status: SequraOrderStatus;
  emailSent: boolean;
  productCode?: string;
  createdAt: string;
  updatedAt: string;
};

const STORE_DIR = path.join(process.cwd(), ".data", "sequra-orders");

async function ensureStoreDir() {
  await mkdir(STORE_DIR, { recursive: true });
}

function filePath(key: string) {
  return path.join(STORE_DIR, `${key}.json`);
}

export async function saveSequraOrder(record: SequraStoredOrder) {
  await ensureStoreDir();
  await writeFile(filePath(record.merchantOrderRef), JSON.stringify(record, null, 2), "utf8");
}

export async function getSequraOrderByMerchantRef(
  merchantOrderRef: string,
): Promise<SequraStoredOrder | null> {
  try {
    const raw = await readFile(filePath(merchantOrderRef), "utf8");
    return JSON.parse(raw) as SequraStoredOrder;
  } catch {
    return null;
  }
}

export async function getSequraOrderByUuid(uuid: string): Promise<SequraStoredOrder | null> {
  await ensureStoreDir();
  const files = await readdir(STORE_DIR);
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = await readFile(path.join(STORE_DIR, file), "utf8");
      const record = JSON.parse(raw) as SequraStoredOrder;
      if (record.sequraOrderUuid === uuid) return record;
    } catch {
      continue;
    }
  }
  return null;
}

export async function updateSequraOrder(
  merchantOrderRef: string,
  patch: Partial<SequraStoredOrder>,
): Promise<SequraStoredOrder | null> {
  const current = await getSequraOrderByMerchantRef(merchantOrderRef);
  if (!current) return null;

  const updated: SequraStoredOrder = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await saveSequraOrder(updated);
  return updated;
}

export async function deleteSequraOrder(merchantOrderRef: string) {
  try {
    await unlink(filePath(merchantOrderRef));
  } catch {
    // ignore missing file
  }
}
