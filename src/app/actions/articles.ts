"use server";

import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function handleFileUpload(file: File | null): Promise<string | null> {
  try {
    if (!file || file.size === 0) return null;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
}

export async function createArticle(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File | null;

  if (!title || !category || !content) {
    return;
  }

  try {
    const imageUrl = await handleFileUpload(file);

    await prisma.article.create({
      data: {
        title,
        category,
        content,
        imageUrl,
        authorId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Create article error:", error);
    return;
  }

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function updateArticle(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File | null;

  if (!id || !title || !category || !content) {
    return;
  }

  try {
    const dataToUpdate: any = { title, category, content };

    const imageUrl = await handleFileUpload(file);
    if (imageUrl) dataToUpdate.imageUrl = imageUrl;

    await prisma.article.update({
      where: { id },
      data: dataToUpdate,
    });
  } catch (error) {
    console.error("Update article error:", error);
    return;
  }

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin/articles");
    revalidatePath("/articles");
    revalidatePath("/");
  } catch (error) {
    console.error("Delete article error:", error);
  }
}
