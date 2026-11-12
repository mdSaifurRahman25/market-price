"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const toastShown = useRef(false);

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

  if (isPending || !session?.user) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="skeleton h-8 w-40"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="skeleton w-14 h-14 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="skeleton h-5 w-1/2"></div>
              <div className="skeleton h-4 w-2/3"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full rounded-xl"></div>
        </div>
      </div>
    );
  }

  const user = session.user;
  const sessionStart = session.session?.createdAt
    ? new Date(session.session.createdAt).toLocaleString("bn-BD", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : new Date().toLocaleString("bn-BD", {
        dateStyle: "full",
      });

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Summary Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center text-xl font-bold shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">{user.name}</h2>
              <p className="text-xs sm:text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl"
          >
            সাইন আউট
          </button>
        </div>

        {/* User Details Info */}
        <div className="border border-gray-200 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">
            তথ্য
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-gray-500">নাম</span>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-gray-500">ইমেইল</span>
              <span className="font-medium text-gray-900">{user.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-gray-500">সেশন শুরু</span>
              <span className="font-medium text-gray-900">{sessionStart}</span>
            </div>
          </div>
        </div>

        {/* C3: Update Information Button */}
        <div className="pt-2">
          <Link
            href="/profile/update"
            className="btn bg-teal-700 hover:bg-teal-800 text-white border-none w-full rounded-xl"
          >
            তথ্য আপডেট করুন (Update Information)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
