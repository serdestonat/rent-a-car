import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  try {
    connectToDB();
    const { email, password }: { email: string; password: string } =
      await request.json();
    const UserExistense = await user.findOne({ email });
    if (!UserExistense) {
      return NextResponse.json({ error: "User does not exist." });
    }

    const checkPassword: boolean = await bcrypt.compare(
      password,
      UserExistense.password
    );

    if (!checkPassword) {
      return NextResponse.json({ error: "Wrong Password", status: 404 });
    }

    return NextResponse.json({
      message: "success",
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message, status: 500 });
  }
}
