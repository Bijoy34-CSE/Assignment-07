import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-8xl font-black text-green-700">৪০৪</p>
      <h2 className="mt-4 text-2xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="mt-2 text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="btn mt-6 border-none bg-green-700 text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;