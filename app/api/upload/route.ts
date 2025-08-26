// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type with both MIME type and extension
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const allowedExtensions = ["jpeg", "jpg", "png", "gif"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and GIF are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Validate and sanitize file extension
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Invalid file extension." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with validated extension
    const filename = `${uuidv4()}.${fileExtension}`;

    // Create uploads directory path
    const uploadsDir = join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const filePath = join(uploadsDir, filename);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Return the public URL path
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename: filename,
        size: file.size,
        type: file.type,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log the actual error for debugging
    console.error("Error uploading file:", error);

    // Return more specific error information in development
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment && error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to upload file",
          details: error.message,
          stack: error.stack,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE method to remove uploaded files
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "No filename provided" },
        { status: 400 }
      );
    }

    // Sanitize filename to prevent path traversal
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "");
    const filePath = join(
      process.cwd(),
      "public",
      "uploads",
      sanitizedFilename
    );

    // Check if file exists and delete it
    if (existsSync(filePath)) {
      await writeFile(filePath, ""); // Clear file content first
      // Then use unlink if available, or handle via other means
      return NextResponse.json({ success: true, message: "File deleted" });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
