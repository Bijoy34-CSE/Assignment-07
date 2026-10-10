import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { auth } from "@/lib/auth";

export const metadata = { title: "সাইন ইন | বাজার দর" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; reason?: string }>;
}) {
  const { callbackURL, reason } = await searchParams;

  // shudhu nijer site er path e redirect hobe
  const safeUrl =
    callbackURL && callbackURL.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect(safeUrl);
  }

  return <SignInForm callbackURL={safeUrl} reason={reason} />;
}