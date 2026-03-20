import { NextResponse } from "next/server";
import { tokenStore } from "@/lib/tokenStore";

const THIRTY_MINUTES = 30 * 60 * 1000;

export async function GET() {
  // Clean up tokens older than 30 minutes
  const now = Date.now();
  for (const [key, value] of tokenStore) {
    if (now - value.createdAt > THIRTY_MINUTES) {
      tokenStore.delete(key);
    }
  }

  const token = crypto.randomUUID();
  tokenStore.set(token, { createdAt: now });

  return NextResponse.json({ token });
}
