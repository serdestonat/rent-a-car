import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/email";

export async function POST(request: Request): Promise<Response> {
  try {
    await connectToDB();
    const { email }: { email: string } = await request.json();

    // Kullanıcıyı bul
    const userExists = await user.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        { error: "Bu e-posta ile kayıtlı kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // 6 haneli kod oluştur
    const resetCode = crypto.randomInt(100000, 999999).toString();
    const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika geçerli

    // Kodu veritabanına kaydet
    userExists.resetCode = resetCode;
    userExists.resetCodeExpires = resetCodeExpires;
    await userExists.save();

    // E-posta gönder
    await sendResetEmail(email, resetCode);

    return NextResponse.json(
      { message: "Şifre sıfırlama kodu e-posta adresinize gönderildi" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
