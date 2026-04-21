"use server";
import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTopic(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) return { error: "Title and Content are required." };

  await prisma.forumTopic.create({
    data: {
      title,
      content,
      // @ts-ignore
      authorId: session.user.id,
    },
  });

  revalidatePath("/forum");
  return { success: true };
}

export async function deleteTopic(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.forumTopic.delete({ where: { id } });
  
  revalidatePath("/admin/forum");
  revalidatePath("/forum");
}
