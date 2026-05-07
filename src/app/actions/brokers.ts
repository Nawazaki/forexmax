"use server";

import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Cloud upload handler mirroring the articles logic
async function handleFileUpload(file: File | null): Promise<string | null> {
  try {
    if (!file || file.size === 0) return null;
    const blob = await put(`brokers/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    return blob.url;
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
    return null;
  }
}

export async function createBroker(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return;

  const name = formData.get("name") as string;
  const regulationType = formData.get("regulationType") as string;
  const expectedSpread = formData.get("expectedSpread") as string;
  const minDeposit = formData.get("minDeposit") as string;
  const ibLink = formData.get("ibLink") as string;
  const rating = formData.get("rating") as string;
  const file = formData.get("logo") as File | null;

  // Mandatory fields check
  if (!name || !regulationType || !expectedSpread || !minDeposit || !ibLink || !rating) return;

  try {
    const logoUrl = await handleFileUpload(file);
    
    await prisma.broker.create({
      data: {
        name,
        regulationType,
        expectedSpread,
        minDeposit,
        ibLink,
        rating,
        logoUrl,
      },
    });
  } catch (error) {
    console.error("Create broker error:", error);
    return;
  }

  revalidatePath("/admin/brokers");
  revalidatePath("/brokers");
  revalidatePath("/");
  redirect("/admin/brokers");
}

export async function updateBroker(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return;

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const regulationType = formData.get("regulationType") as string;
  const expectedSpread = formData.get("expectedSpread") as string;
  const minDeposit = formData.get("minDeposit") as string;
  const ibLink = formData.get("ibLink") as string;
  const rating = formData.get("rating") as string;
  const file = formData.get("logo") as File | null;

  if (!id || !name || !regulationType || !expectedSpread || !minDeposit || !ibLink || !rating) return;

  try {
    const dataToUpdate: any = { 
      name, 
      regulationType, 
      expectedSpread, 
      minDeposit, 
      ibLink, 
      rating 
    };
    const logoUrl = await handleFileUpload(file);
    if (logoUrl) dataToUpdate.logoUrl = logoUrl;

    await prisma.broker.update({
      where: { id },
      data: dataToUpdate,
    });
  } catch (error) {
    console.error("Update broker error:", error);
    return;
  }

  revalidatePath("/admin/brokers");
  revalidatePath("/brokers");
  revalidatePath("/");
  redirect("/admin/brokers");
}

export async function deleteBroker(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return;

  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.broker.delete({ where: { id } });
    revalidatePath("/admin/brokers");
    revalidatePath("/brokers");
    revalidatePath("/");
  } catch (error) {
    console.error("Delete broker error:", error);
  }
}
 