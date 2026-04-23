"use server";

import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required.");
  }
}

export async function getBrokers() {
  return await prisma.broker.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBrokerById(id: string) {
  return await prisma.broker.findUnique({
    where: { id },
  });
}

export async function createBroker(formData: FormData) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const affiliateLink = formData.get("affiliateLink") as string;
  const logoFile = formData.get("logo") as File;

  let logoUrl = "";

  if (logoFile && logoFile.size > 0) {
    const blob = await put(logoFile.name, logoFile, {
      access: "public",
    });
    logoUrl = blob.url;
  }

  await prisma.broker.create({
    data: {
      name,
      websiteUrl,
      affiliateLink,
      logoUrl,
    },
  });

  revalidatePath("/admin/brokers");
  revalidatePath("/brokers");
  redirect("/admin/brokers");
}

export async function updateBroker(formData: FormData) {
  await checkAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const affiliateLink = formData.get("affiliateLink") as string;
  const logoFile = formData.get("logo") as File;

  const currentBroker = await prisma.broker.findUnique({ where: { id } });
  if (!currentBroker) throw new Error("Broker not found");

  let logoUrl = currentBroker.logoUrl;

  if (logoFile && logoFile.size > 0) {
    const blob = await put(logoFile.name, logoFile, {
      access: "public",
    });
    logoUrl = blob.url;
  }

  await prisma.broker.update({
    where: { id },
    data: {
      name,
      websiteUrl,
      affiliateLink,
      logoUrl,
    },
  });

  revalidatePath("/admin/brokers");
  revalidatePath("/brokers");
  redirect("/admin/brokers");
}

export async function deleteBroker(id: string) {
  await checkAdmin();
  
  await prisma.broker.delete({
    where: { id },
  });

  revalidatePath("/admin/brokers");
  revalidatePath("/brokers");
}
