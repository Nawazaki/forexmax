"use server";

import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function handleFileUpload(file: File | null): Promise<string | null> {
  try {
    if (!file || file.size === 0) {
      console.log("No file detected in the form.");
      return null;
    }
    
    console.log("File found! Starting upload to Vercel Blob:", file.name);
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    
    const blob = await put(`brokers/${filename}`, file, {
      access: 'public',
    });
    
    console.log("Upload Success! Image URL:", blob.url);
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
  const websiteUrl = (formData.get("websiteUrl") as string) || "";
  const affiliateLink = (formData.get("affiliateLink") as string) || "";
  const file = formData.get("logo") as File | null;

  if (!name) {
    console.log("Creation failed: Name is missing");
    return;
  }

  try {
    const logoUrl = await handleFileUpload(file);
    await prisma.broker.create({
      data: { name, websiteUrl, affiliateLink, logoUrl },
    });
    console.log("Broker saved to DB successfully!");
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
  const websiteUrl = (formData.get("websiteUrl") as string) || "";
  const affiliateLink = (formData.get("affiliateLink") as string) || "";
  const file = formData.get("logo") as File | null;

  if (!id || !name) {
    console.log("Update failed: ID or Name is missing");
    return;
  }

  try {
    const dataToUpdate: any = { name, websiteUrl, affiliateLink };
    
    const logoUrl = await handleFileUpload(file);
    if (logoUrl) {
      dataToUpdate.logoUrl = logoUrl;
      console.log("New logo will be saved to DB:", logoUrl);
    }

    await prisma.broker.update({ where: { id }, data: dataToUpdate });
    console.log("Broker updated in DB successfully!");
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