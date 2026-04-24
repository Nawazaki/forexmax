"use server";

import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  // Extract all fields from the new advanced frontend
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // 1. Basic Field Validation
  // We check all required fields. Username is unique and required by our new UI.
  if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
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
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return { error: "Email already exists. Please login." };

    // 5. Unique Username Check
    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) return { error: "Username is already taken. Please choose another." };

    // 6. Hashing and Storage
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: { 
        email, 
        username,
        firstName,
        lastName,
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
