"use server";

import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // 1. Basic Field Validation
  if (!fullName || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  // 2. Password Match Validation
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // 3. Password Strength Validation
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  try {
    // 4. Unique Email Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Email already exists. Please login." };

    // 5. Hashing and Storage
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
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration." };
  }
}
