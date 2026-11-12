"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      const msg = "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন।";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        const msg = error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
        setErrorMsg(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      const msg = "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMsg(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  // সোশ্যাল লগইন (Google / GitHub)
  const handleSocialLogin = async (provider: "google" | "github") => {
    setErrorMsg("");
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        const msg = error.message || `${provider} দিয়ে লগইন করা যায়নি।`;
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Title & Subtitle */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            সাইন ইন
          </h1>
          <p className="text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="input input-bordered w-full rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-teal-700 hover:bg-teal-800 text-white border-none w-full rounded-xl mt-2"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-800 w-full rounded-xl flex items-center justify-center gap-2 font-medium"
          >
            <span>🌐</span>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-800 w-full rounded-xl flex items-center justify-center gap-2 font-medium"
          >
            <span>🐙</span>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 pt-1">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-teal-700 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
