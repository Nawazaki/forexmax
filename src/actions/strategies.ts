"use server";

import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function handleFileUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function createStrategy(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const difficulty = formData.get("difficulty") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File | null;

  const imageUrl = await handleFileUpload(file);

  await prisma.strategy.create({
    data: {
      title,
      difficulty,
      content,
      imageUrl,
      authorId: session.user.id,
    },
  });

  revalidatePath("/admin/strategies");
  redirect("/admin/strategies");
}

export async function updateStrategy(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const difficulty = formData.get("difficulty") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File | null;

  const dataToUpdate: any = { title, difficulty, content };
  
  const imageUrl = await handleFileUpload(file);
  if (imageUrl) dataToUpdate.imageUrl = imageUrl;

  await prisma.strategy.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/strategies");
  redirect("/admin/strategies");
}

export async function deleteStrategy(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.strategy.delete({ where: { id } });

  revalidatePath("/admin/strategies");
}