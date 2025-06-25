import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  try {
    connectToDB();
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = await request.json();
    const UserExistense = await user.findOne({ email });
    if (UserExistense) {
      return NextResponse.json({ error: "User already exists." });
    }

    const hashPassword: string = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return NextResponse.json({ message: "User registered", status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Server Error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
