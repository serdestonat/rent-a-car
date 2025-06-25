// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

interface UploadResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

interface ErrorWithCode extends Error {
  code?: string;
}

export async function POST(
  request: Request
): Promise<NextResponse<UploadResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.name);
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "cars");
    const filePath = path.join(uploadDir, filename);

    try {
      await writeFile(filePath, buffer);
    } catch (err: unknown) {
      const error = err as ErrorWithCode;
      if (error.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
        await writeFile(filePath, buffer);
      } else {
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      imageUrl: `/images/cars/${filename}`,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
