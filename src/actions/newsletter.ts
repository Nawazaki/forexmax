"use server";
import prisma from "../lib/prisma";
export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email || !email.includes("@")) return { error: "Invalid email address" };
  try {
    await prisma.subscriber.upsert({
      where: { email }, update: {}, create: { email },
    });
    return { success: "Successfully subscribed!" };
  } catch (error) {
    return { error: "Failed to subscribe" };
  }
}
