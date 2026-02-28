//TODO: notifications are done by services/mail.ts
// POST- Notify admin about adding a teacher

import { NextResponse } from "next/server";

export async function POST() {
  // Placeholder - notifications are handled by services/mail.ts
  return NextResponse.json(
    { message: "Notification endpoint not implemented" },
    { status: 501 }
  );
}
