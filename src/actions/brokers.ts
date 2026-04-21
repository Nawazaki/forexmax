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

export async function createBroker(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const affiliateLink = formData.get("affiliateLink") as string;
  const file = formData.get("logo") as File | null;

  const logoUrl = await handleFileUpload(file);

  await prisma.broker.create({
    data: { name, websiteUrl, affiliateLink, logoUrl },
  });

  revalidatePath("/admin/brokers");
  redirect("/admin/brokers");
}

export async function updateBroker(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const affiliateLink = formData.get("affiliateLink") as string;
  const file = formData.get("logo") as File | null;

  const dataToUpdate: any = { name, websiteUrl, affiliateLink };
  const logoUrl = await handleFileUpload(file);
  if (logoUrl) dataToUpdate.logoUrl = logoUrl;

  await prisma.broker.update({ where: { id }, data: dataToUpdate });

  revalidatePath("/admin/brokers");
  redirect("/admin/brokers");
}

export async function deleteBroker(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.broker.delete({ where: { id } });
  revalidatePath("/admin/brokers");
}
