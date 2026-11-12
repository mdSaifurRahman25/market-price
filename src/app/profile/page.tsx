"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, signOut, useSession } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const toastShown = useRef(false);

  const currentName = name !== null ? name : session?.user?.name || "";

  // লগইন না থাকলে টোস্ট দেখিয়ে সাইন ইন পেজে পাঠানো
  useEffect(() => {
    if (!isPending && !session?.user) {
      if (!toastShown.current) {
        toastShown.current = true;
        toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন!");
      }
      router.push("/signin");
    }
  }, [isPending, session, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  // BetterAuth-এর updateUser ব্যবহার করে নাম আপডেট করা (C3)
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentName.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: currentName.trim(),
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
        setUpdating(false);
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট করা হয়েছে!");
      setUpdating(false);
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
      setUpdating(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-2xl space-y-5">
        <div className="space-y-2">
          <div className="skeleton h-8 w-44"></div>
          <div className="skeleton h-4 w-64"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4">
          <div className="skeleton w-16 h-16 rounded-2xl"></div>
          <div className="space-y-2 flex-1">
            <div className="skeleton h-5 w-40"></div>
            <div className="skeleton h-4 w-52"></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="skeleton h-5 w-16"></div>
          <div className="skeleton h-11 w-full rounded-xl"></div>
          <div className="skeleton h-11 w-full rounded-xl"></div>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-5">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Card 1: User Avatar, Name, Email & Sign Out Button */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-gray-200 shrink-0"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="font-bold text-lg sm:text-xl text-gray-900 truncate">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-sm sm:btn-md bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium self-start sm:self-center"
        >
          ↪ সাইন আউট
        </button>
      </div>

      {/* Card 2: তথ্য (Update Name Card matching Figma) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="font-bold text-base sm:text-lg text-gray-900">তথ্য</h3>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="input input-bordered w-full rounded-xl bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none w-full rounded-xl text-base font-medium"
          >
            {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
