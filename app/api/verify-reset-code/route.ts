import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  try {
    await connectToDB();
    const { email, code }: { email: string; code: string } =
      await request.json();

    // Kullanıcıyı ve kodu kontrol et
    const userExists = await user.findOne({
      email,
      resetCode: code,
      resetCodeExpires: { $gt: new Date() },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Geçersiz veya süresi dolmuş kod" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Kod doğrulandı", email },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
