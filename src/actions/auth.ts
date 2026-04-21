"use server";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const terms = formData.get("terms") as string;

  if (!fullName || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  if (terms !== "on") {
    return { error: "You must agree to the Terms and Conditions." };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Email already exists. Please login." };

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        role: "USER" 
      }
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong during registration." };
  }
}
