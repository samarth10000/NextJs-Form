import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
// // import multer from "multer";
// // import path from "path";
// // import fs from "fs";
import User from "models/User"; // Sequelize User model
// import sequelize from "lib/sequelize";
import { uploadImage } from "lib/cloudinary";

// // Disable body parser (since we’re using multer)
// // export const config = {
// //   api: { bodyParser: false },
// // };

// // Setup multer storage
// // const upload = multer({
// //   storage: multer.diskStorage({
// //     destination: "./public/resumes", // resumes folder
// //     filename: (_, file, cb) => {
// //       cb(null, Date.now() + path.extname(file.originalname));
// //     },
// //   }),
// // });

// export async function POST(req: NextRequest) {
//   try {
//     // Multer only works in Node.js, so we wrap it
//     // const formData = await req.formData();
//     // const email = formData.get("email") as string;
//     // const password = formData.get("password") as string;
//     // const resumeFile = formData.get("resume") as File | null;
//     const { file, email, password } = req.body;
//     if (!email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }
//     const url = await uploadImage(file);

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // let resumePath = null;
//     // if (resumeFile) {
//     //   const bytes = await resumeFile.arrayBuffer();
//     //   const buffer = Buffer.from(bytes);
//     //   const filePath = path.join(
//     //     process.cwd(),
//     //     "public",
//     //     "resumes",
//     //     resumeFile.name
//     //   );
//     //   fs.writeFileSync(filePath, buffer);
//     //   resumePath = `/resumes/${resumeFile.name}`;
//     // }

//     // await sequelize.sync(); // ensure tables exist
//     // await User.sync({ alter: true });

//     const user = await User.create({
//       email,
//       password: hashedPassword,
//       resume: url,
//     });

//     return NextResponse.json(
//       { message: "User registered", user },
//       { status: 201 }
//     );
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

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
