"use server";

import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTopic(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return;
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return;
  }

  try {
    await prisma.forumTopic.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Create topic error:", error);
    return;
  }

  revalidatePath("/forum");
  revalidatePath("/");
}

export async function deleteTopic(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.forumTopic.delete({ where: { id } });
    revalidatePath("/admin/forum");
    revalidatePath("/forum");
    revalidatePath("/");
  } catch (error) {
    console.error("Delete topic error:", error);
  }
}
