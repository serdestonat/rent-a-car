import nodemailer from "nodemailer";

export async function sendResetEmail(email: string, code: string) {
  // 1. Gmail transporter oluştur
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // 2. E-posta seçenekleri
  const mailOptions = {
    from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Şifre Sıfırlama Kodu",
    text: `Şifre sıfırlama kodunuz: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">${process.env.NEXT_PUBLIC_APP_NAME} - Şifre Sıfırlama</h2>
        <p>Aşağıdaki kodu kullanarak şifrenizi sıfırlayabilirsiniz:</p>
        <div style="background: #f3f4f6; padding: 16px; text-align: center; font-size: 24px; letter-spacing: 2px; margin: 16px 0;">
          ${code}
        </div>
        <p>Bu kod <strong>15 dakika</strong> boyunca geçerlidir.</p>
        <p style="font-size: 12px; color: #6b7280;">Eğer bu isteği siz yapmadıysanız, bu e-postayı dikkate almayınız.</p>
      </div>
    `,
  };

  // 3. E-postayı gönder
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Şifre sıfırlama kodu ${email} adresine gönderildi`);
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    throw new Error("E-posta gönderilemedi");
  }
}
