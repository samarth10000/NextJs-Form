import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "models/User";
import sequelize from "lib/sequelize";
import path from "path";
import { writeFile } from "fs/promises";

// ✅ POST /api/auth/signup
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const resumeFile = formData.get("resume") as File;

    if (!email || !password || !resumeFile) {
      return NextResponse.json(
        { error: "Email, password, and resume are required" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save resume to /public/uploads folder
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, resumeFile.name);

    await writeFile(filePath, buffer);

    // Store file path in DB
    await sequelize.authenticate();
    const user = await User.create({
      email,
      password: hashedPassword,
      resume: `/uploads/${resumeFile.name}`, // just storing path
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
