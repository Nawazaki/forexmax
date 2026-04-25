"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerUser(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) return { error: "Passwords do not match." };
  if (password.length < 6) return { error: "Password must be at least 6 characters long." };

  try {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return { error: "Email already exists." };

    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) return { error: "Username is already taken." };

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 1. Create the user (emailVerified is null by default)
    const user = await prisma.user.create({
      data: { 
        email, username, firstName, lastName, password: hashedPassword, role: "USER" 
      }
    });

    // 2. Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours expiry

    // 3. Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: expires,
      }
    });

    // 4. Send Email via Resend
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
    
    await resend.emails.send({
      from: 'ForexMax <auth@forexmax.com>',
      to: email,
      subject: 'Verify your ForexMax Account',
      html: `<p>Welcome ${firstName}! Please verify your email to activate your account.</p>
             <a href="${verificationLink}" style="display:block; padding:12px 24px; background: #10b981; color:white; border-radius:8px; text-decoration:none; font-weight:bold;">Verify Email Address</a>`
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration." };
  }
}

// This action will be used by the /verify page
export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return { error: "Invalid or expired verification token." };
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }
    });

    // Delete the token so it can't be used again
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    return { success: true };
  } catch (error) {
    return { error: "An error occurred during verification." };
  }
}
