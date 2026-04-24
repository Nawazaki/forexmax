"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DEFAULT_DISCLAIMER = "Trading Forex and CFDs carries a high level of risk and may result in the loss of all your investment. Please ensure you fully understand the risks involved and seek independent advice if necessary.";

export async function getSettings() {
  const settings = await prisma.settings.findFirst();

  if (!settings) {
    // Initialize default settings if none exist
    return await prisma.settings.create({
      data: {
        riskDisclaimer: DEFAULT_DISCLAIMER,
        telegramChannel: "https://t.me/forexm_ax",
        telegramSupport: "@Nanobotai",
      },
    });
  }

  return settings;
}

export async function updateSettings(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }

  const settings = await prisma.settings.findFirst();
  if (!settings) throw new Error("Settings not initialized");

  const riskDisclaimer = formData.get("riskDisclaimer") as string;
  const telegramChannel = formData.get("telegramChannel") as string;
  const telegramSupport = formData.get("telegramSupport") as string;

  await prisma.settings.update({
    where: { id: settings.id },
    data: {
      riskDisclaimer,
      telegramChannel,
      telegramSupport,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/disclaimer");
  revalidatePath("/"); // Revalidate footer
  redirect("/admin/settings");
}
