//TODO: implement when needed
// PATCH- Edit a comment (owner or admin)
// DELETE- Delete a comment (owner or admin)

import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    { message: "Not implemented" },
    { status: 501 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Not implemented" },
    { status: 501 }
  );
}
