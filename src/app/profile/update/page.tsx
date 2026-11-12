"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toastShown = useRef(false);

  const currentName = name !== null ? name : session?.user?.name || "";

  // লগইন না থাকলে টোস্ট দেখিয়ে সাইন ইন পেজে পাঠানো
  useEffect(() => {
    if (!isPending && !session?.user) {
      if (!toastShown.current) {
        toastShown.current = true;
        toast.error("তথ্য আপডেট করতে অনুগ্রহ করে সাইন ইন করুন!");
      }
      router.push("/signin");
    }
  }, [isPending, session, router]);

  // BetterAuth-এর updateUser ব্যবহার করে নাম আপডেট করা (C3)
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentName.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: currentName.trim(),
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
        setLoading(false);
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
      setLoading(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-2xl space-y-5">
        <div className="skeleton h-8 w-48"></div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="skeleton h-12 w-full rounded-xl"></div>
          <div className="skeleton h-11 w-full rounded-xl"></div>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          তথ্য আপডেট করুন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার প্রোফাইলের নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
        </p>
      </div>

      {/* User Avatar & Info Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex items-center gap-4">
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

      {/* Update Form Card */}
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
              placeholder="আপনার নতুন নাম লিখুন"
              className="input input-bordered w-full rounded-xl bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none w-full rounded-xl text-base font-medium"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>

        <div className="text-center pt-1">
          <Link
            href="/profile"
            className="text-sm text-gray-600 hover:text-teal-700 hover:underline"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
