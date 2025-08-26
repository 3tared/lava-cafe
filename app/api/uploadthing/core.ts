// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define the file upload endpoint for job application pictures
  jobApplicationImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // we can Add any authentication/authorization logic here if needed
      // For now, we'll allow all uploads cuz its a public form

      // we could add user authentication like but not now:
      // const user = await auth(req);
      // if (!user) throw new UploadThingError("Unauthorized");

      return {
        uploadedBy: "anonymous", // or user.id if you have auth
        timestamp: Date.now(),
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete!");
      console.log("file url", file.url);
      console.log("uploaded by", metadata.uploadedBy);

      // we could save additional metadata to cafe database here if needed
      // await prisma.uploadLog.create({ data: { url: file.url, ... } });

      return {
        uploadedBy: metadata.uploadedBy,
        url: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
