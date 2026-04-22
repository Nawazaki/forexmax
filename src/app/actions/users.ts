"use server";

import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) return;

  // Security: Prevent admin from deleting themselves
  if (session.user.id === id) {
    return;
  }

  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Delete user error:", error);
  }
}

export async function updateUserRole(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  const role = formData.get("role") as "ADMIN" | "USER";

  if (!id || !role) {
    return;
  }

  try {
    await prisma.user.update({
      where: { id },
      data: { role }
    });

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Update user role error:", error);
  }
}
