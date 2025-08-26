// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    console.log("Upload request received");

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      console.log("No file in request");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      console.log("Invalid file type:", file.type);
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Only JPEG, PNG, and GIF are allowed.`,
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log("File too large:", file.size);
      return NextResponse.json(
        {
          error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum size is 5MB.`,
        },
        { status: 400 }
      );
    }

    // Get file extension and validate it
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["jpeg", "jpg", "png", "gif"];

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      console.log("Invalid file extension:", fileExtension);
      return NextResponse.json(
        {
          error:
            "Invalid file extension. Only JPEG, JPG, PNG, and GIF files are allowed.",
        },
        { status: 400 }
      );
    }

    console.log("File validation passed");

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("File converted to buffer, size:", buffer.length);

    // Generate unique filename
    const filename = `${uuidv4()}.${fileExtension}`;

    // Create uploads directory path
    const uploadsDir = join(process.cwd(), "public", "uploads");
    console.log("Uploads directory:", uploadsDir);

    // Ensure uploads directory exists
    try {
      if (!existsSync(uploadsDir)) {
        console.log("Creating uploads directory...");
        await mkdir(uploadsDir, { recursive: true });
        console.log("Uploads directory created successfully");
      }
    } catch (mkdirError) {
      console.error("Error creating directory:", mkdirError);
      return NextResponse.json(
        { error: "Failed to create uploads directory" },
        { status: 500 }
      );
    }

    const filePath = join(uploadsDir, filename);
    console.log("Full file path:", filePath);

    // Write file to disk
    try {
      await writeFile(filePath, buffer);
      console.log("File written successfully");
    } catch (writeError) {
      console.error("Error writing file:", writeError);
      return NextResponse.json(
        { error: "Failed to save file to disk" },
        { status: 500 }
      );
    }

    // Return the public URL path
    const publicUrl = `/uploads/${filename}`;
    console.log("Upload successful, public URL:", publicUrl);

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
    console.error("Unexpected error in upload:", error);

    // Return detailed error in development
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        {
          error: "Failed to upload file",
          details: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
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
