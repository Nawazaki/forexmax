"use server";
import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  
  // Security: Prevent admin from deleting themselves
  if (session.user.email === id) {
    throw new Error("Cannot delete your own account");
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function updateUserRole(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const role = formData.get("role") as "ADMIN" | "USER";

  await prisma.user.update({ 
    where: { id }, 
    data: { role } 
  });
  
  revalidatePath("/admin/users");
}
