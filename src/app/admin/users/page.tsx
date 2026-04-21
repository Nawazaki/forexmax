import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { Users as UsersIcon, ShieldAlert, ShieldCheck, Trash2, Mail } from "lucide-react";
import { deleteUser, updateUserRole } from "../../../actions/users";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <UsersIcon className="h-6 w-6 text-blue-600" /> Manage Users
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            View all registered members, manage roles, and monitor community access.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-semibold text-sm border border-blue-100 dark:border-blue-800">
          Total Users: {users.length}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">User Email</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Role</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">Joined Date</th>
              <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {users.map((user) => {
              const isCurrentUser = session?.user?.email === user.email;
              
              return (
                <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                          {user.email}
                          {isCurrentUser && (
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full dark:bg-blue-900/40 dark:text-blue-400">You</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                        <ShieldAlert className="h-3.5 w-3.5" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        <ShieldCheck className="h-3.5 w-3.5" /> User
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3 items-center">
                      {!isCurrentUser && (
                        <>
                          <form action={updateUserRole}>
                            <input type="hidden" name="id" value={user.id} />
                            <input type="hidden" name="role" value={user.role === "ADMIN" ? "USER" : "ADMIN"} />
                            <button type="submit" className="text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300">
                              {user.role === "ADMIN" ? "Demote" : "Make Admin"}
                            </button>
                          </form>

                          <form action={deleteUser}>
                            <input type="hidden" name="id" value={user.id} />
                            <button type="submit" className="p-1.5 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors" title="Delete User">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
