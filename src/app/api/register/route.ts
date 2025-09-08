import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import User from "models/User"; // Sequelize User model
// import sequelize from "lib/sequelize";
import { uploadImage } from "lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // ✅ parse form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const file = formData.get("resume") as File | null;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const url = file ? await uploadImage(file) : null;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      resume: url,
    });

    return NextResponse.json(
      { message: "User registered", user },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
