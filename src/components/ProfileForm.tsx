"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ProfileForm = ({ name }: { name: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newName = (form.get("name") as string).trim();

    if (!newName) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: newName });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
      return;
    }
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
      <div>
        <label className="mb-1 block text-sm">নাম</label>
        <input
          type="text"
          name="name"
          defaultValue={name}
          className="input input-bordered w-full bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn w-full border-0 bg-green-700 text-white shadow hover:bg-green-800"
      >
        {loading ? "অপেক্ষা করুন..." : "আপডেট"}
      </button>
    </form>
  );
};

export default ProfileForm;