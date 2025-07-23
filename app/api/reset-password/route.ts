import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  try {
    await connectToDB();
    const { email, password }: { email: string; password: string } =
      await request.json();

    // Kullanıcıyı bul
    const userExists = await user.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Yeni şifreyi hashle ve kaydet
    const hashedPassword = await bcrypt.hash(password, 10);
    userExists.password = hashedPassword;
    userExists.resetCode = undefined;
    userExists.resetCodeExpires = undefined;
    await userExists.save();

    return NextResponse.json(
      { message: "Şifre başarıyla güncellendi" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
