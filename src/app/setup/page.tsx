import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function SetupPage() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // This will CREATE if not exists, or UPDATE role to ADMIN if exists
  const admin = await prisma.user.upsert({
    where: { email: "admin@forexmax.com" },
    update: { 
      role: "ADMIN" 
    },
    create: {
      email: "admin@forexmax.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 shadow-2xl text-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-blue-600">🛡️</span>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">Admin Recovery</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
          The account <span className="font-bold text-blue-600">{admin.email}</span> is now a verified ADMIN.
        </p>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl font-mono text-sm dark:text-zinc-300 text-left mb-8">
          Status: ACTIVE <br />
          Role: {admin.role} <br />
          Password: admin123
        </div>
        <a href="/login" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
          Go to Login
        </a>
      </div>
    </div>
  );
}
