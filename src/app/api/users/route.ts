import { NextResponse } from "next/server";
import User from "models/User";

export async function GET() {
  const users = await User.findAll();
  return NextResponse.json(users);
}
