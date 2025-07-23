import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  try {
    const response = NextResponse.json({ message: "Logged Out" });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Logout error:", error); // Error'ı logluyoruz
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
