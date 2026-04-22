"use server";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function subscribeNewsletter(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return;
  }

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Newsletter subscription error:", error);
  }
}
